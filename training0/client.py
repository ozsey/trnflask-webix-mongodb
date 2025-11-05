from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/input-data', methods=['POST'])
def inputData():
    # Ambil data dari form
    nama = request.form.get('nama')
    nim = request.form.get('nim')
    alamat = request.form.get('alamat')

    # Kirim data ke server menggunakan AJAX
    response = requests.post(
        'http://localhost:8081/input-data',
        data={"nama": nama, "nim": nim, "alamat": alamat}
    )

    return response.json()

@app.route('/get-data')
def getData():
    # Ambil data dari server menggunakan AJAX
    data = requests.get('http://localhost:8081/get-data')
    return data.json()

if __name__ == '__main__':
    app.run(debug=True, port=8082)