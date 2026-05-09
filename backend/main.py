# backend/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

pp = FastAPI()

class OccupancySlot(BaseModel):
    time_slot: str
    occupancy_level: int  # 0–100 or similar

class OccupancyResponse(BaseModel):
    location_id: str
    slots: List[OccupancySlot]

@app.get("/api/occupancy", response_model=OccupancyResponse)
async def get_occupancy(location_id: str):
    try:
        # TODO: replace with your real data source / logic
        # Example dummy data:
        data = {
            "location_id": location_id,
            "slots": [
                {"time_slot": "09:00", "occupancy_level": 30},
                {"time_slot": "10:00", "occupancy_level": 60},
            ],
        }

        # Basic validation
        if "slots" not in data or not isinstance(data["slots"], list):
            raise ValueError("Invalid data format: 'slots' missing or not a list")

        return data

    except ValueError as ve:
        # Schema / data issues
        raise HTTPException(status_code=500, detail=f"Data error: {str(ve)}")
    except Exception as e:
        # Unexpected server error
        raise HTTPException(status_code=500, detail="Internal server error")