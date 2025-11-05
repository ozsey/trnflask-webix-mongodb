from flask import Flask, request
from database import Database
import config

app = Flask(__name__)

dbmongo = Database(config.DB_KAPITA)

@app.route('/')
def index():
    filter = {'first_name': 'Howard'}
    result = dbmongo.findOne(config.COLLECTION_STUDENTS, filter)
    return result

if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True)