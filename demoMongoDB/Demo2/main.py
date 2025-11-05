# main.py
from pymongo.mongo_client import MongoClient
import datetime

# - - - #
# URI = "mongodb+srv://672021159:672021159@672021159.3d39jp6.mongodb.net/"
URI = "mongodb://localhost:27017/"
client = MongoClient(URI)
db = client["db_kapita"]
collection = db['students_collection']
# - - - #

# FInd (one)
""" search_id = "2447024089"

result = collection.find_one({"_id": search_id})

if result:
    print("Data ditemukan:")
    print(result)
else:
    print("Data tidak ditemukan untuk _id:", search_id) """

# Find (many)
""" search_criteria = {"first_name": "Michael"}

results = collection.find(search_criteria)

print("Data yang ditemukan:")
for result in results:
    print(result) """

# Create (one)
""" static_data_single = {
    "_id": "2455261711",
    "first_name": "Hosea",
    "last_name": "Nicolas",
    "email": "hosea.nicolas@example.com",
    "address": "Karanganyar, Jawa Tengah, Indonesia",
    "phone_number": "081259096700",
    "birthdate": datetime.datetime(2004, 6, 14),
    "registered_at": datetime.datetime(2024, 1, 1, 12, 0, 0)
}

collection.insert_one(static_data_single)

print("Satu dokumen statis berhasil dimasukkan.") """

# Create (many)
""" static_data_multiple = [
    {
        "_id": "2455261300",
        "first_name": "Shafira",
        "last_name": "Afkari",
        "email": "shafira.afkari@example.com",
        "address": "456 Elm St, Othertown, USA",
        "phone_number": "555-5678",
        "birthdate": datetime.datetime(2003, 7, 20),
        "registered_at": datetime.datetime(2024, 2, 15, 10, 0, 0)
    },
    {
        "_id": "2455261400",
        "first_name": "Daniel",
        "last_name": "Raka",
        "email": "daniel.raka@example.com",
        "address": "789 Oak St, Anycity, USA",
        "phone_number": "555-9012",
        "birthdate": datetime.datetime(2005, 9, 30),
        "registered_at": datetime.datetime(2024, 3, 25, 14, 30, 0)
    }
]

collection.insert_many(static_data_multiple)

print("Banyak dokumen statis berhasil dimasukkan.") """

# Update (one)
""" filter_criteria = {"_id": "2455261700"}

update_data = {
    "$set": {
        "last_name": "Nicholas",
        "email": "hosea.nicholas@example.com"
    }
}

result = collection.update_one(filter_criteria, update_data)

if result.matched_count > 0:
    print("Dokumen berhasil diperbarui.")
else:
    print("Dokumen tidak ditemukan atau tidak ada perubahan yang dilakukan.") """

# Update (many)
""" filter_criteria_many = {"first_name": "Hosea"}

update_data_many = {
    "$set": {
        "last_name": "Nicolas"
    }
}

result_many = collection.update_many(filter_criteria_many, update_data_many)

print(f"{result_many.modified_count} dokumen berhasil diperbarui.") """

# Delete (one)
""" delete_criteria = {"_id": "2455261700"}

result = collection.delete_one(delete_criteria)

if result.deleted_count > 0:
    print("Dokumen berhasil dihapus.")
else:
    print("Dokumen tidak ditemukan atau tidak ada yang dihapus.") """

# Delete (many)
""" delete_criteria_many = {"first_name": "Michael"}

result_many = collection.delete_many(delete_criteria_many)

print(f"{result_many.deleted_count} dokumen berhasil dihapus.") """