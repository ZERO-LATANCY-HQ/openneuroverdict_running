def final_vote(hr, ethics, devil):
    def weight(decision, confidence):
        return confidence if decision.lower() == "hire" else -confidence

    score = weight(hr["decision"], hr["confidence"])
    score += weight(devil["decision"], devil["confidence"])

    if ethics["decision"].lower() == "concern":
        score -= ethics["confidence"] * 0.5

    # Fairness score: 100 minus penalty for bias concerns
    fairness_score = 100 if ethics["decision"].lower() == "agree" else max(0, round(100 - ethics["confidence"] * 60))

    return {
        "final_decision": "Hire" if score > 0 else "Reject",
        "final_score": round(score, 2),
        "fairness_score": fairness_score
    }
