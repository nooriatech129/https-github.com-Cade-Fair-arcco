import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_recommendations_valid():
    request_data = {
        "days": ["Mon", "Tue"],
        "start_hour": 9,
        "end_hour": 17
    }
    response = client.post("/recommendations", json=request_data)
    assert response.status_code == 200
    data = response.json()
    assert "recommendations" in data
    # Assuming get_recommendations returns a list
    assert isinstance(data["recommendations"], list)


def test_recommendations_invalid_days():
    request_data = {
        "days": ["InvalidDay"],
        "start_hour": 9,
        "end_hour": 17
    }
    response = client.post("/recommendations", json=request_data)
    assert response.status_code == 400


def test_recommendations_invalid_hours():
    request_data = {
        "days": ["Monday"],
        "start_hour": 25,
        "end_hour": 17
    }
    response = client.post("/recommendations", json=request_data)
    assert response.status_code == 400