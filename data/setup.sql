PRAGMA foreign_keys = On;

BEGIN;

CREATE TABLE tracks (
  id INTEGER PRIMARY KEY,
  track_name TEXT NOT NULL,
  place_name TEXT NOT NULL,
  region_name TEXT NOT NULL,
  track_type TEXT NOT NULL,
  track_length_km INTEGER NOT NULL,
  tranck_length_time TEXT NOT NULL,
  track_level TEXT NOT NULL,
  start_point TEXT NOT NULL,
  start_lat INTEGER NOT NULL,
  start_long INTEGER NOT NULL,
  start-website TEXT,
  intro TEXT NOT NULL,
  description TEXT NOT NULL,
  date_created TEXT NOT NULL DATETIME('now'),
  -- how can I store images in the dbase? With a link?
  -- how can I store a content string for the googlemaps marker?
  -- how can I store different marker types here, so fe a walking marker and a cycling marker.
);

INSERT INTO tracks
  ( track_name, place_name, region_name, track_type, track_length, track_level, start_point, start_lat, start_long,  intro, description, date_created )
VALUES
  ( 'Hillwalk around Chateau de Bridoire', 'Ribagnac', 'Dordogne', 'walk', 8, '2 hours' 'easy', 'Chateau de Bridoire', 44.768269, 0.458669, 'http://www.chateaudebridoire.com/', 'Explore the beautifull hills around Ribagnac and have a French picknick in the gardens of the medieval chateau de Bridoire', 'This easy walk starts next tot the Chateau de Bridoire. You can park your car here and start the walk. Make sure you bring enough water, because there are no cafes along the road. This easy walk travels mainly on small roads. After your walk you can visit the medieval Chateau. It has been restaured since 2005 and you can sit in the garden while eating a pcknick-basket that you can purchase there. Have fun!'  '2018-01-11 13:52:11' ),
  ( 'Walk through the vineyards of Monbazillac', 'Monbazillac', 'Dordogne', 'walk', 10, '3 hours' 'medium', 'Chateau de Monbazillac', 44.796853, 0.494109, 'http://chateau-monbazillac.com/en/', 'Walk through the vineyards of the famous MOnbazillac sweet wines and enjoy the amazing views over the valley of the Dordogne', 'This hike starts next tot the Chateau de Monbazillac. You can park your car here and start the walk. Make sure you bring enough water, because there are no cafes along the road. This walk contains some off-road tracks through vineyards and over small hills. After your walk you can visit the beautifull. You can also do a winetasting here. In the cute little village there is a cafe where you can grab a bite. Have fun!'  '2018-01-11 13:52:11' ),
  ( 'Enjoy the beautifull views around Sigoulès', 'Sigoulès', 'Dordogne', 'walk', 14, '4 hours' 'easy', 'restaurant Chépaou', 44.758330, 0.410451, 'http://www.aca-sigoules.fr/chepaou/index.php', 'Explore the hills around the little village of Sigoules and enjoy the stunning views', 'This walk starts in a little shopping area in Sigoules. You can park your car here and start the walk. Make sure you bring enough water, because there are no cafes along the road. This easy but long walk will show you around in the quiet and serene area. It can get pretty hot out there! After your can grab a bite a the typically local restaurant, where you can have simple, but nice food starting from 12,- for a menu. Have fun!'  '2018-01-15 13:52:11' );

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_mail TEXT NOT NULL,
)

INSERT INTO users
  ( user_name, user_mail )
VALUES
  ( 'Mr.Potato Ofcourse', 'rosti@potato.com' ),
  ( 'Laudulaulau', 'dordogne@cool.fr' ),
  ( 'Frenchy Girl', 'ilove@croissants.nl');

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
  track_id INTEGER NOT NULL REFERENCES tracks,
  date_posted TEXT NOT NULL DEFAULT DATETIME('now'),
  review_star INTEGER NOT NULL, -- this connects to the 5 star radopbutton review, how can I store this? With the value?
  review_text TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users,
  user_name TEXT NOT NULL REFERENCES users,
  user_mail TEXT NOT NULL REFERENCES users,
);

INSERT INTO reviews
  ( track_id, date_posted, review_star, review_text, user_id, user_name, user_mail )
VALUES
  ( 1, '2018-02-15 13:52:11', 5, 'Very cool track! It took us a bit longer, but that was ok!', 1, 'Mr.Potato Ofcourse', 'rosti@potato.com' ),
  ( 2, '2018-02-15 13:52:11', 4, 'Nice track and the chateu is great!', 2, 'Laudulaulau', 'dordogne@cool.fr' ),
  ( 3, '2018-03-15 13:52:11', 4, 'Good views. Take enough water, it was a long way!', 3, 'Frenchy Girl', 'ilove@croissants.nl');
