from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.interaction_checker import check_interactions

from utils.groq_interaction import evaluate_interaction

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/check', methods=['POST'])
def check_route():
    data = request.get_json()
    meds = data.get("medications", [])
    result = check_interactions(meds)
    return jsonify(result)


@app.route('/groq', methods=['POST'])
def get_groq_analysis():
    data = request.get_json()

    medications = data.get("medications", [])
    age = data.get("age")
    gender = data.get("gender")


    if len(medications) < 2:
        return jsonify({"error": "At least two medications are required"}), 400
    if age is None or gender is None:
        return jsonify({"error": "Age and gender are required"}), 400
    
    data.setdefault("reason", "")
    data.setdefault("conditions", [])

    data.setdefault("pregnant", "Unknown")

    data.setdefault("allergies", [])

    response = evaluate_interaction(data)
    return jsonify({"response": response})

@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "I'm alive"})


if __name__ == '__main__':
    app.run(debug=True, port=5050)

