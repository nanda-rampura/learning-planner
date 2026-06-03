import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

client: AsyncIOMotorClient = None
db = None


async def connect_db():
    global client, db
    client = AsyncIOMotorClient(os.getenv("MONGODB_URI"))
    db = client[os.getenv("DATABASE_NAME", "learning_planner")]
    print("Connected to MongoDB Atlas")


async def close_db():
    global client
    if client:
        client.close()
        print("Disconnected from MongoDB Atlas")


def get_db():
    return db
