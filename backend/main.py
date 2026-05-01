from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from recommender import get_recommendations

app = FastAPI()


class RecommendationRequest(BaseModel):
    days: list[str]
    start_hour: int
    end_hour: int


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/recommendations")
def recommendations(request: RecommendationRequest):
    valid_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    if not all(day in valid_days for day in request.days):
        raise HTTPException(status_code=400, detail="Invalid day(s) provided")
    
    try:
        results = get_recommendations(
            request.days,
            request.start_hour,
            request.end_hour
        )
        return {"recommendations": results}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))