"""Web API for protolk server."""
from typing import Dict
import uuid

from aiohttp import web
import pymongo

from store import Store

class ProtolkApiImp:
    """Implementation of protolk API"""
    def __init__(self, store: Store):
        """ProtolkApiImp constructor."""
        self._store = store

    async def get_user(self, user_id: str):
        """Get specific user."""
        return await self._store.get_user(user_id)

    async def get_users(self):
        """Get all users."""
        return await self._store.get_users()

    async def post_user(self, user: Dict):
        """Add a new user."""
        if not "id" in user:
            user["id"] = str(uuid.uuid4())
        return await self._store.post_user(user)

    async def delete_user(self, user_id: str):
        """Delete a specific user."""
        return await self._store.delete_user(user_id)

    async def delete_users(self):
        """Delete all users."""
        return await self._store.delete_users()


class ProtolkWebApp:
    """Protolk web app"""
    def __init__(self, implementation: ProtolkApiImp):
        """Initialize protolk web server."""
        self.implementation = implementation
        self.app = web.Application()

    def build_users_endpoint(self, routes):
        """Add users endpoint requests."""
        @routes.get("/users/{user_id}")
        async def get_users(request):
            user = await self.implementation.get_user(request.match_info["user_id"])
            if not user:
                return web.Response(status=404)
            return web.json_response(status=200, data=user)

        @routes.get("/users")
        async def get_users(request):
            users = await self.implementation.get_users()
            return web.json_response(status=200, data=users)

        @routes.post("/users")
        async def post_user(request):
            body = await request.json()
            try:
                await self.implementation.post_user(body)
                return web.Response(status=201)
            except pymongo.errors.DuplicateKeyError:
                return web.Response(status=401)

        @routes.delete("/users/{user_id}")
        async def delete_user(request):
            if await self.implementation.delete_user(request.match_info["user_id"]):
                return web.Response(status=204)
            return web.Response(status=404)

        @routes.delete("/users")
        async def delete_users(request):
            await self.implementation.delete_users()
            return web.Response(status=204)

    def build_rooms_endpoint(self, routes):
        pass

    def build_sessions_endpoint(self, routes):
        pass

    def build_app(self):
        """Build web app."""
        routes = web.RouteTableDef()
        self.build_users_endpoint(routes)
        self.build_rooms_endpoint(routes)
        self.build_sessions_endpoint(routes)

        ###
        self.app.add_routes(routes)

    def run_app(self):
        """Run web app."""
        web.run_app(self.app)
