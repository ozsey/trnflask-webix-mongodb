from pymongo import MongoClient
from globalVar import URI_MONGO
from common.satlog import log
import sys

class SatMongoDB() :
    def __init__(self, db, collection) :
        self._client = MongoClient(URI_MONGO)
        self._db = self._client[db]
        self._collection = self._db[collection]

    def find_one(self, query) :
        statusFindOne = False
        resultFindOne = None
        try :
            resultFindOne = self._collection.find_one(query)
            statusFindOne = True
        except Exception as error:
            strMessage = f"[SATMONGODB] fail to select | {error} | {sys.exc_info()} |"
            log.error(strMessage)
        return statusFindOne, resultFindOne