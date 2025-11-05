from flask import Flask, render_template, request, jsonify
import requests, os

app = Flask(__name__)

data = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add-data', methods=['POST'])
def add_data():
    global data
    new_data = request.get_json()  
    data.append(new_data)   
    return jsonify(success=True)  

@app.route('/get-data', methods=['GET'])
def get_data():
    return jsonify(data)

# @app.route('/delete-data', methods=['POST'])
# def delete_data():
#     global data
#     item_id = request.get_json()["id"]
#     data = [item for item in data if item["id"] != item_id]
#     return jsonify(success=True)

# @app.route('/send-data', methods=['POST'])
# def sendData():
#     print(request.form)
#     return ''

# @app.route('/get-data', methods=['GET'])
# def getData():
#     os.environ['NO_PROXY'] = 'localhost'
#     data = requests.get('http://localhost:8081/data', headers={})
#     return data.json()

app.run(host="localhost",port=8081, debug=True)