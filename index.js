require("dotenv").config();
const express = require('express');
const app = express();
const port = 3000;

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });

app.use(express.static("public"));
app.use(express.json());

app.get('/test', async(req, res) => {
    const response = "endpoint has been found"
    res.send(response);
});

app.post('/tracking', async(req, res) => {
    const databaseId = await process.env.NOTION_DATABASE_ID;
    await console.log(req.body);
    await console.log('**************************************************');
    //const body = JSON.parse(req.body);
    //console.log(body);
    function propExists(prop) {
        return prop ? prop : "not defined";
    }
    const trackCode = await propExists(req.body.result.tracking_code);
    const trackStatus = await propExists(req.body.result.status);
    const trackDetails = await propExists(req.body.result.tracking_details[req.body.result.tracking_details.length - 1]);
    const trackLocation = await propExists(trackDetails.tracking_location.city + ", " + trackDetails.tracking_location.state + ", " + trackDetails.tracking_location.country);
    const trackUpdate = await propExists(req.body.result.update_at);
    const trackDelivery = await propExists(req.body.result.est_delivery_date);

    res.status(200);
    try {
        const newPage = await notion.pages.create({
            "parent": {
                "type": "database_id",
                "database_id": databaseId
            },
            "properties": {
                "Code": {
                    "title": [
                        {
                            "text": {
                                "content": trackCode
                            }
                        }
                    ]
                },
                "Status": {
                    "rich_text": [
                        {
                            "text": {
                                "content": trackStatus
                            }
                        }
                    ]
                },
                "Tracking Location": {
                    "rich_text": [
                        {
                            "text": {
                                "content": trackLocation
                            }
                        }
                    ]
                },
                "Updated At": {
                    "rich_text": [
                        {
                            "text": {
                                "content": trackUpdate
                            }
                        }
                    ]
                },
                "Est. Delivery Date": {
                    "rich_text": [
                        {
                            "text": {
                                "content": trackDelivery
                            }
                        }
                    ]
                }
            }
        })
        res.send(newPage);
    } catch(error) {
        res.send(error);
    }
});

app.listen(port, () => {
    console.log('Example app listening on ${port}');
});