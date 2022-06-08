"""Logger of the protolk backend."""
import logging

logging.basicConfig(format="%(asctime)s - %(levelname)s - %(message)s", level=logging.DEBUG)

LOGGER = logging.getLogger("protolk-backend")
