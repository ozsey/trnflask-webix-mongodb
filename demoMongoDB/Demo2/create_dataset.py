# create_dataset.py
import dateutil.parser
import pymongo
from faker import Faker
import random
import string
import dateutil
import datetime

fake = Faker()

# client = pymongo.MongoClient("mongodb+srv://672021159:672021159@672021159.3d39jp6.mongodb.net/")
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["db_kapita"]
collection = db["students_collection"]

def create_dummy_user():
    digits = string.digits
    random_number_string = '24'+''.join(random.choice(digits) for _ in range(8))
    return {
        "_id": random_number_string,
        "first_name": fake.first_name(),
        "last_name": fake.last_name(),
        "email": fake.email(),
        "address": fake.address(),
        "phone_number": fake.phone_number(),
        "birthdate": dateutil.parser.parse(fake.date_time_between_dates(datetime.datetime(2003,1,1), datetime.datetime(2005,12,31)).strftime('%Y-%m-%d')),
        "registered_at": dateutil.parser.parse(fake.date_time_this_year().strftime('%Y-%m-%d %H:%M:%S'))
    }

for _ in range(100):
    user_data = create_dummy_user()
    collection.insert_one(user_data)