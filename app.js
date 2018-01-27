var express = require("express");
var app = express();

app.use(express.static("public"));

var cities = {
    "Dublin" : "Ireland",
    "Barcelona" : "Spain",
    "New York" : "USA",
    "Tokyo" : "Japan",
    "Sydney" : "Australia"
};

app.get("/cities", function(request, response) {
   var cities = ["Dublin", "Barcelona", "New York", "Tokyo", "Sydney"]; 
   if(request.query.limit >= 0) {
       response.json(cities.slice(0, request.query.limit));
   } else if(request.query.limit >= cities.length) {
       response.status(404).json("Exceeds number of cities");  
   } else {
    response.json(Object.keys(cities));   
   }
});

app.param("name", function(request, response, next) {
    var name = request.params.name;
    var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
    
    request.cityName = city;
    next();
});

app.get("/cities/:name", function(request, response){
    var description = cities[request.cityName];
    if(!description) {
        response.status(404).json("No description found for " + request.params.name);    
    } else {
        response.json(description);
    }
});


app.listen(process.env.PORT, function() {
    console.log(process.env.IP);
    console.log(process.env.PORT);
});