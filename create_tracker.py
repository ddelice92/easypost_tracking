import os
import easypost

client = easypost.EasyPostClient(os.getenv("TEST_EASYPOST_API_KEY"))

tracker = client.tracker.create(
    tracking_code = "EZ1000000001",
    carrier="FedEx"
)

print(tracker)