from flask import Flask
from common.satconnectmongodb import SatMongoDB

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index() :
    return "Hello, world!"

@app.route("/getDatas", methods=["GET"])
def getDatas() :
    dbMongo = SatMongoDB("sample_mflix", "users")
    query = {"name": "Gilly"}
    result = dbMongo.find_one(query)
    return str(result)

if __name__ == "__main__":
    app.run(debug=True)