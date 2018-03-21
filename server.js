// THIS IS THE SERVERFILE FOR MY TRACKAPP FOR THE FINAL ASSIGNMENT FROM THE NEW YORK COSING AND DESIGN ACADEMY
// THIS IS ALSO A LOG. I HAVE A LOT OF COMMENTS FOR MY OWN RECAPTION

// Created a server with the module Express and created a variable called server to store all the express methods in
const express = require("express");
const server = express();

// Installed the sqlite module (important: place the the sqlite3.exe file in the dbase folder (and hide it in .gitignore))
const sqlite = require("sqlite");
// Created a variable to store the dbase
let g_db = null;

// Required the Node module body-parser to parse incoming request bodies in middleware (through the req.body property)
const bodyparser = require("body-parser");

// Created the middleware for the bodyparser
server.use(bodyparser.urlencoded({
  extended: true
}));

// Installed the template engine PUG and stored the module in a variable
const pug = require("pug");

// Created a variable for the portnumber
const port = 8080;

//Set Pug as the view engine
server.set('view engine', 'pug');

// Created a static folder for all the client side stuff like CSS, client-side scripts and images
server.use(express.static(__dirname + '/public'))

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


//// --------------------------------------- GET ROUTES -----------------------------------------------------------//////

//Set the route for the main view
server.get('/', (req, res) => {
    res.render('index');
});

//Set the route for the view with all the locations - connected to the array as a test! / OLS STUFF NOW IT RUNS THE DBASE
// server.get('/locations', async (req, res) => {
//     res.render('locations', {locations: Object.values(locationDatabase)});   // in between curly braces is the optional parameter to pass local variables to the view through an object
// });

//Set the route for the view with all the locations - connected to the Padvinder Database :-)!
server.get("/tracks", async (req, res) => {
    const tracks = await g_db.all(`
    SELECT
      id, track_name, place_name, region_name,
      track_type, track_length_km, track_length_time,
      track_level, intro, description, image_link
    FROM tracks
  `);
  //console.log(tracks);
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

// Set the route for the view with a single location - connected to Dbase...- connected to the Padvinder Database :-)!
server.get("/tracks/:trackID", async (req, res) => {

      // console.log("value 1:", req.params);  //Should return the object trackID as a string { trackID: 'X' }
      const parsedID = parseInt(req.params.trackID);
      //console.log("value 2:", parsedID);

      const [ track, reviews, map ] = await Promise.all([
        //The question mark represents a parameter that will later be replaced.
        // Using parameterized queries is more secure than embedding the parameters right into the query.
        //database get is for selecting 1 row out the table, all is to select all rows.
          g_db.get(`SELECT * FROM tracks WHERE id = ?`, parsedID),
          g_db.all(`SELECT * FROM reviews WHERE track_id = ? ORDER BY date_posted DESC`, parsedID),
          g_db.get(`SELECT * FROM maps WHERE track_id = ?`, parsedID)

      ]);

      if (!track) {
          res.status(404).end("Track not found!");
          return;
      }
      //console.log("value 3:", track);
      //console.log("value 4:", reviews);
      //console.log("value 5:", map);
      res.render("onelocation", {
          track,
          reviews,
          map
      });
});


//Set the route for the map view
// server.get('/map', async (req, res) => {
//     res.render('map');
// });

//Set the route for the map view
server.get("/map", async (req, res) => {
    const maps = await g_db.all(`SELECT * FROM maps`);
    //console.log("value: ", maps);
    // const numTracks = g_db.get(`SELECT id FROM maps WHERE ID = (SELECT MAX(id) from maps)`);
    // console.log(numTracks);

    res.render("map", {maps});
});

//Set the route for the add track view
server.get('/addtrack', async (req, res) => {
    res.render('addtrack');
});


//// --------------------------------------- POST ROUTES -----------------------------------------------------------//////

//Set the route to post the added track to the dbase and then show it in. - connected to the Padvinder Database :-)!
server.post("/addtrack", async (req, res) => {

  const addedTrack = await g_db.run(`
    INSERT INTO tracks
      ( track_name, place_name, region_name, track_type, track_length_km, track_length_time, track_level, intro, description, image_link, date_created )
    VALUES
      ( $track_name, $place_name, $region_name, $track_type, $track_length_km, $track_length_time, $track_level, $intro, $description, $image_link, DATETIME('now'))`, {
    $track_name: req.body.track_name,
    $place_name: req.body.place_name,
    $region_name: req.body.region_name,
    $track_type: req.body.track_type,
    $track_length_km: req.body.track_length_km,
    $track_length_time: req.body.track_length_time,
    $track_level: req.body.track_level,
    $intro: req.body.intro,
    $description: req.body.description,
    $image_link: req.body.image_link
  });

  // get the trackID assigned to the just created track
  const { trackID } = await g_db.get("SELECT LAST_INSERT_ROWID() AS trackID");
  console.log(trackID);
  console.log(req.body);
  console.log(req.params);

  await g_db.run(`
    INSERT INTO maps
      ( track_id, track_name, start_point_name, start_lat, start_long, start_website, infoWindowText )
    VALUES
      ( $track_id, $track_name, $start_point_name, $start_lat, $start_long, $start_website, $infoWindoWText )`, {
    $track_id: trackID,
    $track_name: req.body.track_name,
    $start_point_name: req.body.start_point_name,
    $start_lat: req.body.start_lat,
    $start_long: req.body.start_long,
    $start_website: req.body.start_website,
    $infoWindoWText: req.body.intro
  });


  res.redirect(`/tracks/${trackID}`);
});


// Set the route to post reviews to the database. NOT WORKING YET!!!!
server.post("/tracks/:trackID", (req, res) => {

  console.log("value A:", req.params);
  const trackID = parseInt(req.params.trackID);

  g_db.run(`
   INSERT INTO reviews
     ( track_id, date_posted, review_star, review_text, user_name, user_mail )
   VALUES
     ( $trackID, DATETIME('now'), $review_star, $review_text, $user_name, $user_mail )`, {
   $trackID: trackID,
   $review_star: req.body.review_star,
   $review_text: req.body.review_text,
   $user_name: req.body.user_name,
   $user_mail: req.body.user_mail
  });

  res.redirect(`/tracks/${trackID}`);

});


// ----------------------------------- OPEN PORT AND CONNECT TO DATABASE ----------------------------------------------

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
