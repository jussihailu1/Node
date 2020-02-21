const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// DB stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbUser:dbUserPassword@cluster0-j0lfr.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

// initialize express middleware for handling POST data.
// app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const Schema = mongoose.Schema;

// Define schema
var carSchema = new Schema({
    id: Number,
    brand: String
});

// Initialize the model.
const Car = mongoose.model('Car', carSchema);

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
    let car = new Car({
        ...req.body                 //This takes and pulls apart an iterable object and regelt die torrie vanzelf.
    });

    car.save((err, newCar) => {
        console.log("Saved!");
        res.json({ status: "succes", car: newCar });
    });

    res.json({
        status: "succes",
        car: car
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));