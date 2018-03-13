CREATE TABLE tracks (
  id INTEGER PRIMARY KEY,
  track_name TEXT NOT NULL,
  place_name TEXT NOT NULL,
  region_name TEXT NOT NULL,
  track_type TEXT NOT NULL,
  track_length_km TEXT NOT NULL,
  track_length_time TEXT NOT NULL,
  track_level TEXT NOT NULL,
  intro TEXT NOT NULL,
  description TEXT NOT NULL,
  image_link TEXT NOT NULL,
  date_created TEXT NOT NULL
);

CREATE TABLE maps (
  id INTEGER PRIMARY KEY,
  track_id INTEGER NOT NULL REFERENCES tracks,
  track_name TEXT NOT NULL REFERENCES tracks,
  start_point_name TEXT NOT NULL,
  start_lat INTEGER NOT NULL,
  start_long INTEGER NOT NULL,
  start_website TEXT
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_mail TEXT UNIQUE NOT NULL
);

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
  track_id INTEGER NOT NULL REFERENCES tracks,
  date_posted TEXT NOT NULL,
  review_star INTEGER NOT NULL,
  review_text TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users,
  user_name TEXT NOT NULL REFERENCES users,
  user_mail TEXT NOT NULL REFERENCES users
);


INSERT INTO tracks
  ( track_name, place_name, region_name, track_type, track_length_km, track_length_time, track_level, intro, description, date_created, image_link )
VALUES
  ( 'Hillwalk around Chateau de Bridoire', 'Ribagnac', 'Dordogne', 'walk', '8 km', '2 hours', 'easy', 'Explore the beautifull hills around Ribagnac and have a French picknick in the gardens of the medieval chateau de Bridoire', 'This easy walk starts next to the Chateau de Bridoire. You can park your car here and start the walk. Make sure you bring enough water, because there are no cafes along the road. This easy walk travels mainly on small roads. After your walk you can visit the medieval Chateau. It has been restaured since 2005 and you can sit in the garden while eating a pcknick-basket that you can purchase there. Have fun!', '2018-01-11 13:52:11', 'http://static.panoramio.com/photos/large/92605638.jpg' ),
  ( 'Walk through the vineyards of Monbazillac', 'Monbazillac', 'Dordogne', 'walk', '10 km', '3 hours', 'medium', 'Walk through the vineyards of the famous Monbazillac sweet wines and enjoy the amazing views over the valley of the Dordogne', 'This hike starts next tot the Chateau de Monbazillac. You can park your car here and start the walk. Make sure you bring enough water, because there are no cafes along the road. This walk contains some off-road tracks through vineyards and over small hills. After your walk you can visit the beautifull. You can also do a winetasting here. In the cute little village there is a cafe where you can grab a bite. Have fun!', '2018-01-11 13:52:11', 'http://www.sarlat-tourisme.com/sites/default/files/sirtaqui_files/33f769540442d94ba4db1bca7f636989.jpg' ),
  ( 'Enjoy the beautifull views around Sigoulès', 'Sigoulès', 'Dordogne', 'walk', '14 km', '4 hours', 'easy', 'Explore the hills around the little village of Sigoules and enjoy the stunning views', 'This walk starts in a little shopping area in Sigoules. You can park your car here and start the walk. Make sure you bring enough water, because there are no cafes along the road. This easy but long walk will show you around in the quiet and serene area. It can get pretty hot out there! After your can grab a bite a the typically local restaurant, where you can have simple, but nice food starting from 12,- for a menu. Have fun!', '2018-01-15 13:52:11', 'http://static.panoramio.com/photos/large/51993988.jpg' );


INSERT INTO maps
  ( track_id, track_name, start_point_name, start_lat, start_long, start_website )
VALUES
  ( 1, 'Hillwalk around Chateau de Bridoire', 'Chateau de Bridoire', 44.768269, 0.458669, 'http://www.chateaudebridoire.com/' ),
  ( 2, 'Walk through the vineyards of Monbazillac', 'Chateau de Monbazillac', 44.796853, 0.494109, 'http://chateau-monbazillac.com/en/' ),
  ( 3, 'Enjoy the beautifull views around Sigoulès', 'Restaurant Chépaou', 44.758330, 0.410451, 'http://www.aca-sigoules.fr/chepaou/index.php' );


INSERT INTO users
  ( user_name, user_mail )
VALUES
  ( 'Mr.Potato Ofcourse', 'rosti@potato.com' ),
  ( 'Laudulaulau', 'dordogne@cool.fr' ),
  ( 'Frenchy Girl', 'ilove@croissants.nl' );


INSERT INTO reviews
  ( track_id, date_posted, review_star, review_text, user_id, user_name, user_mail )
VALUES
  ( 1, '2018-02-15 13:52:11', 5, 'Very cool track! It took us a bit longer, but that was ok!', 1, 'Mr.Potato Ofcourse', 'rosti@potato.com' ),
  ( 2, '2018-02-15 13:52:11', 4, 'Nice track and the chateu is great!', 2, 'Laudulaulau', 'dordogne@cool.fr' ),
  ( 3, '2018-03-15 13:52:11', 4, 'Good views. Take enough water, it was a long way!', 3, 'Frenchy Girl', 'ilove@croissants.nl');
