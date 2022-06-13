"""Store is the interface between the app and mongo."""
from typing import Dict

class Store:
    """Class that communicates with mongodb."""
    def __init__(self, motor_client, db_name: str):
        """Create Store instance."""
        database = motor_client.get_database(db_name)
        self._users = database.get_collection("users")
        self._rooms = database.get_collection("rooms")
        self._sessions = database.get_collection("sessions")

    async def initialize(self):
        """Initialize collections creating index."""
        await self._users.create_index("id", unique=True)
        await self._rooms.create_index("id", unique=True)
        await self._sessions.create_index("id", unique=True) 

    async def get_user(self, user_id: str):
        """Get a single user."""
        projection = {"_id": False}
        return await self._users.find_one({"id": user_id}, projection)

    async def get_users(self, limits: int=10):
        """Get all users."""
        projection = {"_id": False}
        return await self._users.find({}, projection).to_list(length=limits)

    async def post_user(self, user: Dict):
        """Insert a new user."""
        res = await self._users.insert_one(user)
        return bool(res.acknowledged)

    async def delete_user(self, user_id: str):
        """Delete a specific user."""
        res = await self._users.delete_one({"id": user_id})
        return bool(res.deleted_count)

    async def delete_users(self):
        """Delete all users."""
        await self._users.delete_many({})
        return True

    async def get_room(self, room_id: str):
        """Get a single room."""
        projection = {"_id": False}
        return await self._rooms.find_one({"id": room_id}, projection)

    async def get_rooms(self,
                        owner_id: str=None,
                        user_id: str=None,
                        limits: int=10):
        """Get all rooms."""
        projection = {"_id": False}
        mongo_filter = {}
        if owner_id:
            mongo_filter["owner_id"] = owner_id
        if user_id:
            mongo_filter["users"] = user_id
        return await self._rooms.find(mongo_filter, projection).to_list(length=limits)

    async def post_room(self, room: Dict):
        """Insert a new room."""
        res = await self._rooms.insert_one(room)
        return bool(res.acknowledged)

    async def put_user_in_room(self, room_id: str, user_id: str):
        """Add a user in a room."""
        if await self._rooms.find_one_and_update(
            filter={"id": room_id, "users": {"$nin": [user_id]}},
            update={"$push": {"users": user_id}}
        ):
            return True
        return False

    async def delete_user_from_room(self, room_id: str, user_id: str):
        """Remove user from a room."""
        res = await self._rooms.find_one_and_update(
            filter={"id": room_id},
            update={"$pull": {"users": user_id}}
        )
        if user_id in res["users"]:
            return True
        return False

    async def delete_room(self, room_id: str):
        """Delete a specific room."""
        res = await self._users.delete_one({"id": room_id})
        return bool(res.deleted_count)

    async def delete_rooms(self):
        """Delete all rooms."""
        await self._rooms.delete_many({})
        return True
