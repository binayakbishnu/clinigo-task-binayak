const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const cors = require("cors");
app.use(cors());

// app.get("/", cors(), function (req, res) {
//     res.send("Hello World!");
// });

app.post("/sendCityName", async function (req, res) {
    console.log("backend: post function");

    const { name } = req.body;


    // TODO get data from weather app
    const weatherData = {
        city: name,
        temp: 32,
        description: "sunny",
        windSpeed: 0,
        humidity: "80%",
    }

    try {
        console.log(`${weatherData}`);
        res.status(200).json(weatherData);
    } catch (e) {
        res.status(404).json({ message: `${e}` });
        console.log(`${e}`);
    }
    // res.redirect("/home");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log(`Server started successfully ${PORT}`);
});
