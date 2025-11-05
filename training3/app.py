from flask import Flask, render_template, request, redirect, url_for, session
import csv

app = Flask(__name__)
app.secret_key = "secret_key"

users = {
    'user1': 'password1',
    'user2': 'password2'
}

def read_data():
    with open('data.csv', 'r', newline='') as file:
        reader = csv.DictReader(file)
        data = [row for row in reader]
    return data

def write_data(data):
    with open('data.csv', 'w', newline='') as file:
        fieldnames = ['id', 'name', 'price']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users and users[username] == password:
            session['username'] = username
            return redirect(url_for('data'))
        else:
            return render_template('login.html', error='Invalid username or password')
    return render_template('login.html')

@app.route('/data')
def data():
    if 'username' not in session:
        return redirect(url_for('login'))
    data = read_data()
    return render_template('data.html', data=data)

@app.route('/insert', methods=['GET', 'POST'])
def insert():
    if 'username' not in session:
        return redirect(url_for('login'))
    if request.method == 'POST':
        data = read_data()
        new_data = {
            'id': request.form['id'],
            'name': request.form['name'],
            'price': request.form['price']
        }
        data.append(new_data)
        write_data(data)
        return redirect(url_for('data'))
    return render_template('insert.html')

@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
    if 'username' not in session:
        return redirect(url_for('login'))
    data = read_data()
    for item in data:
        if int(item['id']) == id:
            if request.method == 'POST':
                item['name'] = request.form['name']
                item['price'] = request.form['price']
                write_data(data)
                return redirect(url_for('data'))
            return render_template('update.html', id=id, data=item)
    return 'Data not found'

@app.route('/delete/<int:id>')
def delete(id):
    if 'username' not in session:
        return redirect(url_for('login'))
    data = read_data()
    for index, item in enumerate(data):
        if int(item['id']) == id:
            del data[index]
            write_data(data)
            return redirect(url_for('data'))
    return 'Data not found'

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)