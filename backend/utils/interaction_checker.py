import pandas as pd

# Load the CSV once
df = pd.read_csv('utils/drug_data.csv')

# Infer tags and actions based on note keywords
def infer_interaction_tags(note):
    note = (note or "").lower()
    if 'bleed' in note:
        return '🩸 Bleeding Risk', '❌ Avoid co-prescription'
    elif 'gi upset' in note or 'stomach' in note or 'digestive' in note:
        return '🤢 GI Risk', '⚠️ Monitor symptoms'
    elif 'heart' in note or 'cardiac' in note:
        return '❤️ Cardiac Risk', '📞 Consult cardiologist'
    elif 'kidney' in note or 'renal' in note:
        return '🩺 Renal Risk', '🧫 Monitor kidney function'
    elif 'liver' in note or 'toxicity' in note:
        return '🧪 Liver Risk', '🧬 Check liver enzymes'
    elif 'serotonin' in note:
        return '🧠 Serotonin Syndrome Risk', '❗ Use with caution'
    else:
        return '📋 General Risk', 'ℹ️ Use with caution'

# Check pairwise interactions
def check_interactions(meds):
    results = []
    meds = [m.strip().lower() for m in meds]

    for i in range(len(meds)):
        for j in range(i + 1, len(meds)):
            d1, d2 = meds[i], meds[j]

            match = df[
                ((df['drug1'].str.lower() == d1) & (df['drug2'].str.lower() == d2)) |
                ((df['drug1'].str.lower() == d2) & (df['drug2'].str.lower() == d1))
            ]

            if not match.empty:
                row = match.iloc[0]
                tag, action = infer_interaction_tags(row.get('notes', ''))
                results.append({
                    "drugs": [row['drug1'], row['drug2']],
                    "risk": row['risk_level'],
                    "note": row.get('notes', ''),
                    "type": tag,
                    "action": action
                })

    return {"interactions": results}
