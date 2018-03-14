//This is the server file for my final project.

// Created a server with the module Express and created a variable called server to store all the express methods in
const express = require("express");
const server = express();

// Installed the sqlite module (in the folder is the sqlite3.exe file)
const sqlite = require("sqlite");
let g_db = null;

// Required the Node module body-parser to parse incoming request bodies in middleware (through the req.body property)
const bodyparser = require("body-parser");

// Create the middleware for the bodyparser
server.use(bodyparser.urlencoded({
  extended: true
}));

// Installed the template engine PUG and store the module in a variable
const pug = require("pug");

// Created a variable for the portnumber
const port = 8080;

//Set Pug as the view engine
server.set('view engine', 'pug');

// Store all JS in Scripts folder.
server.use(express.static(__dirname + '/public'))

// //Store all CSS in Styles folder.
// server.use(express.static(__dirname + '/styles'))
//
// //Store all CSS in Styles folder.
// server.use(express.static(__dirname + '/images'))

// For testing now an array with objects
// NOW IT RUNS ON THE DBASE
// let locationDatabase = {
//     1: {
//         id: 1,
//         name: "Chateau de Mobazillac",
//         text: "This is a BIG castle.",
//         image: "http://www.sarlat-tourisme.com/sites/default/files/sirtaqui_files/33f769540442d94ba4db1bca7f636989.jpg",
//         latitude: 44.7966125,
//         langitude: 0.4919465
//     },
//
//     2: {
//         id: 2,
//         name: "Chateau de Bridoire",
//         text: "Knights like fighting",
//         image: "http://static.panoramio.com/photos/large/92605638.jpg",
//         latitude: 44.7965911,
//         langitude: 0.4240952
//     },
//
//     3: {
//         id: 3,
//         name: "Chateau de Castelnaud",
//         text: "That is a nice view!",
//         image: "http://www.perigordnoir-valleedordogne.com/sites/default/files/galleries/castelnaud.jpg",
//         latitude: 44.7965827,
//         langitude: 0.4250942
//     }
// }

//Set the route for the main view
server.get('/', (req, res) => {
    res.render('index');
});

//Set the route for the view with all the locations - connected to the array as a test! / NOW IT RUNS THE DBASE
// server.get('/locations', async (req, res) => {
//     res.render('locations', {locations: Object.values(locationDatabase)});   // in between curly braces is the optional parameter to pass local variables to the view through an object
// });

//Set the route for the view with all the locations - connected to the Padvinder Database :-)!
server.get("/tracks", async (req, res) => {
    const tracks = await g_db.all(`
    SELECT
      id,
      track_name,
      place_name,
      region_name,
      track_type,
      track_length_km,
      track_length_time,
      track_level,
      intro,
      description,
      image_link
    FROM tracks
  `);
  console.log(tracks);
  res.render("locations", {tracks: tracks});
});


// //Set the route for the view with a single location - connected to the array as a test! / NOW IT RUNS THE DBASE
// server.get('/tracks/:id', async (req, res) => {
//     const location = locationDatabase[req.params.id];
//     if(!location) {           //is the following maybe a stricter solution: if (typeof location === 'undefined' || location === null) {
//         res.redirect('/tracks');
//         return;
//     }
//     res.render('onelocation', location);
// });

// Set the route for the view with a single location - connected to Dbase...Todo
server.get("/tracks/:trackID", async (req, res) => {
      const trackID = parseInt(req.params.trackID);

      const [ track, reviews ] = await Promise.all([
          g_db.get("SELECT * FROM tracks WHERE id = ?", trackID),
          g_db.all("SELECT * FROM reviews WHERE track_id = ? ORDER BY date_posted DESC", trackID)
      ]);

      if (!track) {
          res.status(404).end("Thread not found!");
          return;
      }

      res.render("onelocation", {
          track,
          reviews
      });
});


//Set the route for the map view
server.get('/map', async (req, res) => {
    res.render('map');
});

// Set up port for server, always at the bottom of the file so the server will only start listening when all the modules are loaded and routes are created
// server.listen(port, () => console.log(`Server listening to port ${port}!`));
// NOW IT RUNS ON THE DBASE

//Connect database to the server and open port
sqlite.open(`data/padvinder.sqlite3`)
  .then(db => {
    g_db = db;
    server.listen(port, () => console.log(`Server listening to port ${port}!`));
  })
  .catch(error => {
    console.error(`Failed to open database, error: ${error}`);
    process.exit(-1);
  });
