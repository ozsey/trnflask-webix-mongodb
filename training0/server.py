from flask import Flask, request

app = Flask(__name__)

# Data dummy untuk penyimpanan sementara
data_mahasiswa = []

@app.route('/input-data', methods=['POST'])
def inputData():
    # Ambil data dari form
    nama = request.form.get('nama')
    nim = request.form.get('nim')
    alamat = request.form.get('alamat')

    # Simpan data ke dalam list
    data_mahasiswa.append({"nama": nama, "nim": nim, "alamat": alamat})

    return {
        "status": True,
        "message": "Data berhasil disimpan"
    }

@app.route('/get-data')
def getData():
    return {"data": data_mahasiswa}

if __name__ == '__main__':
    app.run(debug=True, port=8081)