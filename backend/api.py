"""
Dependencies
pip install -U Flask
pip install -U flask_cors


Test
http://127.0.0.1:5000/api/items
"""

from flask import Flask, jsonify, request
from flask_cors.extension import CORS
import os
from service import get_candlestick_data

app = Flask(__name__)

# Define CORS
CORS(app, origins=["*"]) # Change to the origin url you need
app.config['CORS HEADERS'] = 'Content-Type'

# Define a GET endpoint that returns all items
@app.route('/api/get-data', methods=['GET'])
def get_items():
    data = get_candlestick_data()
    return jsonify(data)

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))