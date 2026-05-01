import pytest
from recommender import load_crowd_data, get_recommendations


def test_load_crowd_data():
    data = load_crowd_data()
    assert isinstance(data, list)
    assert len(data) > 0
    # Check structure
    for item in data:
        assert "day" in item
        assert "hour" in item
        assert "occupancy" in item
        assert isinstance(item["hour"], int)
        assert isinstance(item["occupancy"], int)


def test_get_recommendations_valid():
    results = get_recommendations(["Monday"], 9, 17)
    assert isinstance(results, list)
    assert len(results) <= 3  # top_n=3
    for r in results:
        assert r["hour"] >= 9 and r["hour"] <= 17
        assert r["day"] == "Monday"


def test_get_recommendations_empty_days():
    with pytest.raises(ValueError, match="Days list cannot be empty"):
        get_recommendations([], 9, 17)


def test_get_recommendations_invalid_hours():
    with pytest.raises(ValueError, match="start_hour must be less than end_hour"):
        get_recommendations(["Monday"], 17, 9)


def test_get_recommendations_no_matches():
    results = get_recommendations(["NonexistentDay"], 9, 17)
    assert results == []