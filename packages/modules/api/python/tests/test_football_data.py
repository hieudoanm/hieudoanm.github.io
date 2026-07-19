import unittest
from unittest.mock import AsyncMock, patch

from api import FootballDataClient


class TestFootballDataClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.json = MagicMock(return_value=data)
        return mock_resp

    async def test_get_competitions(self):
        mock_resp = self._mock_resp(
            {
                "count": 2,
                "competitions": [
                    {"id": 1, "name": "Premier League"},
                    {"id": 2, "name": "La Liga"},
                ],
            }
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = FootballDataClient("test-token")
            result = await client.get_competitions()

        self.assertEqual(result["count"], 2)
        mock_get.assert_called_once_with(
            "https://api.football-data.org/v4/competitions",
            headers={"X-Auth-Token": "test-token"},
        )

    async def test_get_competition(self):
        mock_resp = self._mock_resp({"id": 1, "name": "Premier League"})

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = FootballDataClient("test-token")
            result = await client.get_competition(1)

        self.assertEqual(result["name"], "Premier League")
        mock_get.assert_called_once_with(
            "https://api.football-data.org/v4/competitions/1",
            headers={"X-Auth-Token": "test-token"},
        )

    async def test_get_teams(self):
        mock_resp = self._mock_resp(
            {"count": 1, "teams": [{"id": 1, "name": "Arsenal"}]}
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = FootballDataClient("test-token")
            result = await client.get_teams(limit=50, offset=0)

        self.assertEqual(result["count"], 1)
        mock_get.assert_called_once_with(
            "https://api.football-data.org/v4/teams",
            params={"limit": 50, "offset": 0},
            headers={"X-Auth-Token": "test-token"},
        )

    async def test_get_teams_by_competition(self):
        mock_resp = self._mock_resp({"teams": [{"id": 1}]})

        with patch("httpx.AsyncClient.get", return_value=mock_resp):
            client = FootballDataClient("test-token")
            result = await client.get_teams_by_competition(1)

        self.assertEqual(len(result["teams"]), 1)

    async def test_get_team(self):
        mock_resp = self._mock_resp({"id": 1, "name": "Arsenal"})

        with patch("httpx.AsyncClient.get", return_value=mock_resp):
            client = FootballDataClient("test-token")
            result = await client.get_team(1)

        self.assertEqual(result["name"], "Arsenal")

    async def test_get_matches_by_team(self):
        mock_resp = self._mock_resp({"matches": [{"id": 1}]})

        with patch("httpx.AsyncClient.get", return_value=mock_resp):
            client = FootballDataClient("test-token")
            result = await client.get_matches_by_team(1)

        self.assertEqual(len(result["matches"]), 1)
