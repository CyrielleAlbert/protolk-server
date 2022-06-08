import motor.motor_asyncio

from .logger import LOGGER

class Store:
    """Class that communicates with mongodb."""
    def __init__(self):
        """Create Store instance."""
        host = "localhost"
        port = 27017
        mongodb_url = f"mongodb://{host}:{port}"
        app_name = "app"
        self._client = motor.motor_asyncio.AsyncIOMotorClient(
            mongodb_url
        )
        database = self._client.get_database(app_name)
        self._users = database.get_collection("users")
        self._rooms = database.get_collection("rooms")
        self._sessions = database.get_collection("sessions")

    async def initialize(self):
        """Initialize collections creating index."""
        await self._users.create_index("id", unique=True)
        await self._rooms.create_index("id", unique=True)
        await self._sessions.create_index("id", unique=True) 

    async def get_user(self, user_id):
        """Get a single user."""
        projection = {"_id": False}
        return await self._users.find_one({"id": user_id}, projection)

    async def get_users(self, limits=10):
        """Get all users."""
        projection = {"_id": False}
        return await self._users.find({}, projection).to_list(length=limits)

    async def post_user(self, user):
        """Insert a new user."""
        try:
            await self._user.insert_one(user)
        except Exception as e:
            LOGGER.error(f"Error during post_user: {e}")
            return False
        return True

    async def delete_user(self, used_id):
        """Remove user."""
        await self._user.delete_one({"id": used_id})
        return True

