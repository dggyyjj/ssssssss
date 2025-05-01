const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// נתיב לפניות API
app.get('/flights', async (req, res) => {
    try {
        const response = await axios.get('https://opensky-network.org/api/states/all');
        res.json(response.data);
    } catch (error) {
        res.status(500).send("שגיאה בהבאת הנתונים");
    }
});

// הפעלת השרת
app.listen(port, () => {
    console.log(`השרת פועל בכתובת http://localhost:${port}`);
});
