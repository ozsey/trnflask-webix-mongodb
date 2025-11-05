from flask import Flask
app = Flask(__name__)

from purchase_order.entrypoints.purchase_order_controller import purchase_order_bp
app.register_blueprint(purchase_order_bp)


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=9090)