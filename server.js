//This is the server file for my final project. Please let me know if I make wrong assunmptions or if I do the right coding but with the wrong comment.
//That helps me understand if I really know what I am doing and why. I will delete them in the end, it is also a kind of log.

// Created a server with the module Express and created a variable called server to store all the express methods in
const express = require("express");
const server = express();

// Installed the sqlite module (in the folder is the sqlite3.exe file)
//Todo: create dbase and link it to server before listening to port
const sqlite = require("sqlite");
let g_db = null;

// Required the Node module body-parser to parse incoming request bodies in middleware (through the req.body property)
const bodyparser = require("body-parser");

// server.use(bodyParser.urlencoded({
//   extended: true
// }));

// Installed the template engine PUG and store the module in a variable
const pug = require("pug");

// Created a variable for the portnumber
const port = 8080;

//Set Pug as the view engine
server.set('view engine', 'pug');

// Store all JS in Scripts folder.
server.use(express.static(__dirname + '/scripts'))

// //Store all CSS in Styles folder.
// server.use(express.static(__dirname + '/styles'))
//
// //Store all CSS in Styles folder.
// server.use(express.static(__dirname + '/images'))

// todo: database, for now an array with objects
let locationDatabase = {
    1: {
        id: 1,
        name: "Chateau de Mobazillac",
        text: "This is a BIG castle.",
        image: "http://www.sarlat-tourisme.com/sites/default/files/sirtaqui_files/33f769540442d94ba4db1bca7f636989.jpg",
        latitude: 44.7966125,
        langitude: 0.4919465
    },

    2: {
        id: 2,
        name: "Chateau de Bridoire",
        text: "Knights like fighting",
        image: "http://static.panoramio.com/photos/large/92605638.jpg",
        latitude: 44.7965911,
        langitude: 0.4240952
    },

    3: {
        id: 3,
        name: "Chateau de Castelnaud",
        text: "That is a nice view!",
        image: "http://www.perigordnoir-valleedordogne.com/sites/default/files/galleries/castelnaud.jpg",
        latitude: 44.7965827,
        langitude: 0.4250942
    }
}

//Set the route for the main view
server.get('/', (req, res) => {
    res.render('index');
});

//Set the route for the view with all the locations
server.get('/locations', async (req, res) => {
    res.render('locations', {locations: Object.values(locationDatabase)});   // in between curly braces is the optional parameter to pass local variables to the view through an object
});

//Set the route for the view with a single location
server.get('/locations/:id', async (req, res) => {
    const location = locationDatabase[req.params.id];
    if(!location) {           //is the following maybe a stricter solution: if (typeof location === 'undefined' || location === null) {
        res.redirect('/locations');
        return;
    }
    res.render('onelocation', location);
});

//Set the route for the map view
server.get('/map', async (req, res) => {
    res.render('map');
});

// Set up port for server, always at the bottom of the file so the server will only start listening when all the modules are loaded and routes are created
server.listen(port, () => console.log(`Server listening to port ${port}!`));