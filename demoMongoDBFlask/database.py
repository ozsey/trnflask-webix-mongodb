from pymongo import MongoClient, errors
import config

class Database:
    def __init__(self, dbname):
        try:
            self.connection = MongoClient(config.MONGO_URI)
            self.db = self.connection[dbname]
        except errors.ConnectionFailure as conn_fail:
            print(f"CONNECTION FAILED | {conn_fail}")
        except Exception as err:
            print(f"(ERROR) Others... | {err}")

    def findOne(self, collection_name, filter):
        result = {'status' : False, 'data' : None, 'message' : ''}
        try:
            collection = self.db[collection_name]
            resultFind = collection.find_one(filter)
            result['data'] = resultFind
            result['status'] = True
        except errors.PyMongoError as pymongoError:
            print(f'Error pymongo : {pymongoError}')
            result ['message'] = "An error occurred while retrieving data!"
        return result
    
    """ def __del__(self):
        self.connection.close() """
    
if __name__ == '__main__':
    db = Database(dbname = config.DB_KAPITA)
    filter = {'first_name': 'Howard'}
    result = db.findOne(config.COLLECTION_STUDENTS, filter)
    print(result['status'], result['data'])