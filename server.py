from flask import Flask, render_template, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/assets/<path:path>")
def send_assets(path):
    return send_from_directory('assets', path)

@app.route("/")
def serve():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()