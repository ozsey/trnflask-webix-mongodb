from pymongo.mongo_client import MongoClient

URI = "mongodb+srv://672021159:672021159@672021159.3d39jp6.mongodb.net/"
client = MongoClient(URI)

db = client["Demo1"]

collection = db['students_client']

document = collection.find({'age':20})

print(list(document))