from backend.models import RateCard

def calculate_payout(volume, tpc_percentage):
    rate_card = RateCard.query.order_by(RateCard.id.desc()).first()
    if not rate_card:
        # Default fallback rate
        rate = 55.0
        if tpc_percentage is not None:
            if tpc_percentage <= 22.0:
                rate += 5.0
            elif tpc_percentage >= 30.0:
                rate -= 8.0
        return round(volume * rate, 2)
    return rate_card.calculate_amount(volume, tpc_percentage)

def calculate_esg_impact(total_volume_liters):
    """
    Calculates ESG environmental impact metrics:
    - CO2 emissions avoided: ~0.0028 tons per liter UCO diverted to biofuel
    - Clean water saved from pollution: ~24,000 liters protected per liter UCO
    - Fossil diesel displaced: ~0.88 liters per liter UCO processed
    """
    v = total_volume_liters or 0.0
    return {
        "co2_prevented_tons": round(v * 0.0028, 2),
        "water_saved_liters": round(v * 24000, 0),
        "fossil_diesel_displaced_liters": round(v * 0.88, 1),
    }
