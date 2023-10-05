let express = require('express');
let app = express();
require('dotenv').config();
var bodyParser = require("body-parser")

console.log("Hello World")

app.use("/public", express.static(__dirname + "/public"))
app.use(function(req, res, next){
    console.log(`${req.method} - ${req.path} - ${req.ip} `)
    next()
})
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


// app.get("/", function(req, res) {
//     res.send("Hello Express")
// })

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html")
})

// app.get("/json", function(req, res) {
//     res.json({"message": "Hello JSON"})
// })

app.get("/json", function(req, res) {
    if (process.env.MESSAGE_STYLE === "uppercase"){
        res.json({"message": "HELLO JSON"})
    }else{
        res.json({"message": "Hello JSON"})
    }
})


const getTime = () => {
    return new Date().toDateString();
}

app.get("/now", function(req, res, next) {
    req.time = getTime()
    next();
}, function(req, res) {
    res.json({ time: req.time })
})

app.get("/:whatever/echo/:another", function(req, res) {
    res.json({echo: req.params.whatever, second: req.params.another})
})



app.post("/name", function(req, res) {
    console.log(req.body);
    res.json({name: `${req.body.first} ${req.body.last}`})
})


























 module.exports = app;
