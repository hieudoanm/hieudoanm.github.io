import httpx

from .newsapi_dto import Category, Country, Language, SortBy

NEWS_V2_URL = "https://newsapi.org/v2"


class NewsAPIClient:
    def __init__(self, api_key: str) -> None:
        self._api_key = api_key
        self._client = httpx.AsyncClient()
        self._headers = {"X-Api-Key": api_key}

    async def get_sources(
        self,
        category: Category = Category.GENERAL,
        country: Country = Country.UNITED_STATES,
        language: Language = Language.ENGLISH,
    ) -> dict:
        params: dict[str, str] = {
            "category": category.value,
            "country": country.value,
            "language": language.value,
        }
        response = await self._client.get(
            f"{NEWS_V2_URL}/sources", params=params, headers=self._headers
        )
        data = response.json()
        return {"status": data.get("status"), "sources": data.get("sources", [])}

    async def get_top_headlines(
        self,
        category: Category = Category.GENERAL,
        country: Country = Country.UNITED_STATES,
        page: int = 1,
        page_size: int = 20,
        query: str = "",
        sources: list[str] | None = None,
    ) -> dict:
        params: dict[str, str | int] = {
            "category": category.value,
            "country": country.value,
            "page": page,
            "pageSize": page_size,
        }
        if query:
            params["q"] = query
        if sources:
            params["sources"] = ",".join(sources)
        response = await self._client.get(
            f"{NEWS_V2_URL}/top-headlines", params=params, headers=self._headers
        )
        data = response.json()
        return {
            "status": data.get("status"),
            "totalResults": data.get("totalResults", 0),
            "articles": data.get("articles", []),
        }

    async def get_everything(
        self,
        domains: list[str] | None = None,
        exclude_domains: list[str] | None = None,
        language: Language = Language.ENGLISH,
        from_date: str = "",
        page: int = 1,
        page_size: int = 100,
        q: str = "",
        search_in: list[str] | None = None,
        sort_by: SortBy = SortBy.PUBLISHED_AT,
        sources: list[str] | None = None,
        to_date: str = "",
    ) -> dict:
        params: dict[str, str | int] = {
            "language": language.value,
            "page": page,
            "pageSize": page_size,
            "sortBy": sort_by.value,
        }
        if q:
            params["q"] = q
        if domains:
            params["domains"] = ",".join(domains)
        if exclude_domains:
            params["excludeDomains"] = ",".join(exclude_domains)
        if sources:
            params["sources"] = ",".join(sources)
        if from_date:
            params["from"] = from_date
        if to_date:
            params["to"] = to_date
        if search_in:
            params["searchIn"] = ",".join(search_in)
        response = await self._client.get(
            f"{NEWS_V2_URL}/everything", params=params, headers=self._headers
        )
        data = response.json()
        return {
            "status": data.get("status"),
            "totalResults": data.get("totalResults", 0),
            "articles": data.get("articles", []),
        }
