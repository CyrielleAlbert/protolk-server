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

    async def get_room(self, room_id: str):
        """Get specific room."""
        return await self._store.get_room(room_id)

    async def get_rooms(self, owner_id: str, user_id: str):
        """Get all rooms."""
        return await self._store.get_rooms(
            owner_id=owner_id,
            user_id=user_id
        )

    async def post_room(self, room: Dict):
        """Add a new room."""
        if not "id" in room:
            room["id"] = str(uuid.uuid4())
        room["users"] = [room["owner_id"]]
        return await self._store.post_room(room)

    async def delete_room(self, room_id: str):
        """Delete a specific room."""
        return await self._store.delete_room(room_id)

    async def delete_rooms(self):
        """Delete all rooms."""
        return await self._store.delete_rooms()

    async def put_user_in_room(self, room_id: str, user_id: str):
        """Add a user in a room."""
        return await self._store.put_user_in_room(
            room_id,
            user_id
        )

    async def delete_user_from_room(self, room_id: str, user_id: str):
        """Remove user from a room."""
        return await self._store.delete_user_from_room(
            room_id,
            user_id
        )

class ProtolkWebApp:
    """Protolk web app"""
    def __init__(self, implementation: ProtolkApiImp):
        """Initialize protolk web server."""
        self.implementation = implementation
        self.app = web.Application()

    def build_users_endpoint(self, routes):
        """Build users endpoint requests."""
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
        """Build rooms endpoint requests."""
        @routes.get("/rooms/{room_id}")
        async def get_rooms(request):
            room = await self.implementation.get_room(request.match_info["room_id"])
            if not room:
                return web.Response(status=404)
            return web.json_response(status=200, data=room)

        @routes.get("/rooms")
        async def get_rooms(request):
            owner_id = None
            user_id = None
            if "ownerId" in request.query:
                owner_id = request.query["ownerId"]
            if "userId" in request.query:
                user_id = request.query["userId"]
            rooms = await self.implementation.get_rooms(owner_id, user_id)
            return web.json_response(status=200, data=rooms)

        @routes.post("/rooms")
        async def post_room(request):
            body = await request.json()
            try:
                await self.implementation.post_room(body)
                return web.Response(status=201)
            except pymongo.errors.DuplicateKeyError:
                return web.Response(status=401)

        @routes.delete("/rooms")
        async def delete_rooms(request):
            await self.implementation.delete_rooms()
            return web.Response(status=204)

        @routes.put("/rooms/{room_id}/users/{user_id}")
        async def put_user_in_room(request):
            if await self.implementation.put_user_in_room(
                request.match_info["room_id"],
                request.match_info["user_id"]
            ):
                return web.Response(status=201)
            return web.Response(status=202)

        @routes.delete("/rooms/{room_id}/users/{user_id}")
        async def delete_user_from_room(request):
            if await self.implementation.delete_user_from_room(
                request.match_info["room_id"],
                request.match_info["user_id"]
            ):
                return web.Response(status=204)
            return web.Response(status=202)

    def build_sessions_endpoint(self, routes):
        """Build sessions endpoint requests."""
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
