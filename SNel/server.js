const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// initialize express middleware for handling POST data.
// app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var myCars = {
    cars: [
        { id: 0, brand: "Bmwwwww" },
        { id: 1, brand: "Mercedes" },
        { id: 2, brand: "Opel" },
    ]
};



app.get("/api", (req, res) => res.send("Hello World"));

app.get("/api/cars", (req, res) => res.json(myCars));

app.get("/api/cars/:id", (req, res) => res.json(myCars.cars.find(car => car.id == req.params.id)));

// app.get("/cars/:id/:brand", (req, res) => res.json(myCars.cars.find(car => car.id == req.params.id && car.brand == req.params.brand)));

app.post("/api/cars", (req, res) => {
    // console.log(req.body);

    let car = {
        id: myCars.cars.length,
        ...req.body                 //This takes and pulls apart an iterable object and regelt die torrie vanzelf.
    };

    myCars.cars.push(car);
    
    res.json({})

    res.json({
        status: "succes",
        car: car
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


var efaliso = {}