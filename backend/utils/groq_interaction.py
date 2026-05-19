import requests
import re
import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_URL = os.getenv("GROQ_URL")

SYSTEM_PROMPT = """
You are a clinical AI agent evaluating drug interactions with patient-specific context.

In addition to medications, consider:
- Age
- Gender
- Reason for taking the medications
- Existing health conditions
- Pregnancy/lactation status
- Known allergies

Your response must follow this structure:
1. Risk Level: ...
2. Clinical Severity: ...
3. Mechanism of Interaction: ...
4. Recommendation: ...
5. Knowledge Source Status: ...
6. One-line Summary: Yes or No,  A brief explanation of how risky or safe the combination is, considering the patient's context.

Respond clearly in natural, clinical English.
"""

def build_query(data: dict) -> str:
    meds = ", ".join(data.get("medications", []))
    return f"""
Evaluate interaction between: {meds}

Patient Info:
- Age: {data.get("age", "Unknown")}
- Gender: {data.get("gender", "Unknown")}
- Reason for Use: {data.get("reason", "Not specified")}
- Conditions: {", ".join(data.get("conditions", []))}
- Pregnant/Lactating: {data.get("pregnant", "Unknown")}
- Allergies: {", ".join(data.get("allergies", []))}
""".strip()

def extract_summary(text: str) -> str:
    # Extract line that starts with "6. One-line Summary:"
    match = re.search(r"6\. One-line Summary:\s*(.+)", text, re.IGNORECASE)
    return match.group(1).strip() if match else ""

def evaluate_interaction(data: dict) -> dict:
    query = build_query(data)
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "llama3-8b-8192",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": query}
        ],
        "temperature": 0.3,
        "max_tokens": 1024
    }

    try:
        response = requests.post(GROQ_URL, headers=headers, json=payload)
        response.raise_for_status()
        full_text = response.json()['choices'][0]['message']['content']
        summary = extract_summary(full_text)

        return {
            "response": full_text,
            "summary": summary
        }

    except Exception as e:
        return {
            "response": f"⚠️ Error: {str(e)}",
            "summary": ""
        }
