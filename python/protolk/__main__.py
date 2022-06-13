"""Entry point of the protolk backend application."""
from aiohttp import web
import asyncio
import motor.motor_asyncio as motor

from api import ProtolkWebApp, ProtolkApiImp
from store import Store

def main():
    """Main entry point."""
    event_loop = asyncio.get_event_loop()
    host = "localhost"
    port = 27017
    mongodb_url = f"mongodb://{host}:{port}"
    app_name = "protolk"
    motor_client = motor.AsyncIOMotorClient(mongodb_url)
    store = Store(motor_client, app_name)
    event_loop.run_until_complete(store.initialize())

    web_app = ProtolkWebApp(ProtolkApiImp(store))
    web_app.build_app()
    web.run_app(web_app.app, loop=event_loop)

if __name__ == "__main__":
    main()
