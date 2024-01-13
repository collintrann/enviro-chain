import requests
import json
import pandas as pd
import googlemaps
from pathlib import Path

MY_API_KEY = 'AIzaSyDW2nqOwJjDMlfIF1t0Sh-XfVDjobLw4s8'

def get_distance(api_key, origin, destination):
    base_url = "https://maps.googleapis.com/maps/api/directions/json"
    params = {
        "origin": origin,
        "destination": destination,
        #"mode": "flights",
        "key": api_key
    }

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()
        if "routes" in data and len(data["routes"]) > 0 and "legs" in data["routes"][0] and len(data["routes"][0]["legs"]) > 0:
            distance_text = data["routes"][0]["legs"][0]["distance"]["text"]
            return distance_text
        else:
            print("Invalid API response format")
            return None
    else:
        print("API request failed with status code:", response.status_code)
        return None


def calculate_emissions_data(csv_file_path):
    distances = []
    total_distance = 0
    num_trips = 0
    total_emissions = 0
    df = pd.read_csv(csv_file_path)
    distances = []

    # Iterate through rows and calculate distances
    for index, row in df.iterrows():
        num_trips += 1
        origin = row["Starting Point"]  # Replace with the actual column name for origin
        destination = row["Ending Point"]  # Replace with the actual column name for destination
        trip_distance = get_distance(MY_API_KEY, origin, destination)
        distances.append(trip_distance)
        numeric_str = ''.join(filter(str.isdigit, trip_distance))
        distance_float = float(numeric_str)
        total_distance += float(distance_float)
    return (num_trips, total_distance, total_emissions)

origin = "New York, NY"
destination = "Washington, D.C."
api_key = MY_API_KEY

print(Path.cwd())
test = calculate_emissions_data('/src/backend/travel_expense_report.csv')

print(test)
# "2,183 mi"