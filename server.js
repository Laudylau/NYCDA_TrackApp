// THIS IS THE SERVERFILE FOR MY TRACKAPP FOR THE FINAL ASSIGNMENT FROM THE NEW YORK CODING AND DESIGN ACADEMY

const express = require("express");
const server = express();
const sqlite = require("sqlite");
const bodyparser = require("body-parser");
const pug = require("pug");
const port = 8080;

// Variable to store the dbase
let g_db = null;


// Middleware for the bodyparser
server.use(bodyparser.urlencoded({
  extended: true
}));

//View engine
server.set('view engine', 'pug');

// Static folder for all the client side stuff like CSS, client-side scripts and images
server.use(express.static(__dirname + '/public'))

//// --------------------------------------- GET ROUTES -----------------------------------------------------------//////

//Route for the landingpage
server.get('/', (req, res) => {
    res.render('index');
});

//Route for the all locations page
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


// Route for the single location page
server.get("/tracks/:trackID", async (req, res) => {
      // console.log("value 1:", req.params);  //Should return the object trackID as a string { trackID: 'X' }
      const parsedID = parseInt(req.params.trackID);
      //console.log("value 2:", parsedID);
      const [ track, reviews, map ] = await Promise.all([
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

//Route for the map page
server.get("/map", async (req, res) => {
    const maps = await g_db.all(`SELECT * FROM maps`);
    //console.log("value: ", maps);

    res.render("map", {maps});
});

//Route for the add track page
server.get('/addtrack', async (req, res) => {
    res.render('addtrack');
});


//// --------------------------------------- POST ROUTES -----------------------------------------------------------//////

// Route to post the added track to the dbase
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

// Route to post reviews to the database.
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

sqlite.open(`data/padvinder.sqlite3`)
  .then(db => {
    g_db = db;
    server.listen(port, () => console.log(`Server listening to port ${port}!`));
  })
  .catch(error => {
    console.error(`Failed to open database, error: ${error}`);
    process.exit(-1);
  });
