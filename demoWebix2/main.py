from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    
    # Check login credentials (dummy example)
    if email == 'user@example.com' and password == 'password':
        return jsonify({'success': True, 'message': 'Login successful!'})
    else:
        return jsonify({'success': False, 'message': 'Invalid email or password.'})



if __name__ == '__main__':
    app.run(debug=True, port=8000)  # Menggunakan port 8000