import os
import easypost

client = easypost.EasyPostClient(os.getenv("PRODUCTION_EASYPOST_API_KEY"))

tracker = client.tracker.create(
    tracking_code = "1Z37X1314211940496",
    carrier="UPS"
)

print(tracker)