from flask import Flask, request, jsonify
from flask_cors import CORS
from calculate_emissions import calculate_emissions_data
import os
import tempfile
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        with tempfile.NamedTemporaryFile(delete=False) as temp:
            file.save(temp.name)
            temp.close()

        num_trips, total_distance, total_emissions = calculate_emissions_data(temp.name)

        company_name = request.form.get('company_name', 'Company A')
        current_date = datetime.now().strftime("%Y-%m-%d")
        response_data = {
            "name": company_name,
            "date": current_date,
            "numTrips": num_trips,
            "totalMiles": total_distance,
            "totalEmissions": total_emissions
        }

        os.unlink(temp.name)
        return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
