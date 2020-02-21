const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbUser:dbUserPassword@cluster0-j0lfr.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

// Define schema
var carSchema = new Schema({
    id: Number,
    brand: String
});


// Initialize the model.
const Car = mongoose.model('Car', carSchema);


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


// app.get("/api", (req, res) => res.send("Jussi's api"));
// app.get("/api/cars", (req, res) => res.json(myCars));
// app.get("/api/cars/:id", (req, res) => res.json(myCars.cars.find(car => car.id == req.params.id)));

// app.get("/cars/:id/:brand", (req, res) => res.json(myCars.cars.find(car => car.id == req.params.id && car.brand == req.params.brand)));

app.get("/api/cars", (req, res) => {
    Car.find((err, results) => {
        res.json(results);
    })
});

app.get("/api/cars/:id", (req, res) => {
    Car.findById(req.params.id, (err, result) => {
        res.json(result);
    })
});

app.post("/api/cars", (req, res) => {
    // console.log(req.body);

    let car = new Car({
        id: myCars.cars.length,
        ...req.body                 //This takes and pulls apart an iterable object and regelt die torrie vanzelf.
    });

    // myCars.cars.push(car);
    car.save((err, newCar) => {
        console.log("Saved!");
        res.json({status: "succes", car: newCar});
    });

    res.json({
        status: "succes",
        car: car
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));