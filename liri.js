require("dotenv").config();
var keys = require("./keys.js");

var fs = require("file-system");
var request = require("request");
var moment = require("moment");


/* Was working on bandsintown npm for hours and still could not figure out why it is not pulling out the data from their site... 
   I have read their npm readMe and tried their code but still not working. Had to leave this portion here

var bandsintown = require('bandsintown')("codingbootcamp");
var getBandsInfo = function(bands){
  request("http://rest.bandsintown.com/artists/" + bands + "/events?app_id=codingbootcamp", function(response, body){
    console.log(response);
    var jsonData = JSON.parse(body);
    console.log('Name of the venue: ' + jsonData.name);
    console.log('Venue location" ' + jsonData.city + ',' + jsonData.region + ',' + jsonData.country);
    console.log('Date of the event: ' + moment().format().jsonData.datetime);
  })
}
============================================================================================================= */

var Spotify = require('node-spotify-api');
var client = new Spotify(keys.spotify);

var getArtistNames = function (artist) {
  return artist.name;
}

var userInput = process.argv.splice(3);

var getSpotify = function (songName) {

  client.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);

    }
    var info = data.tracks.items;
    for (var i = 0; i < info.length; i++) {
      console.log(i);
      console.log("\nArtist(s) name: " + info[i].artists.map(getArtistNames));
      console.log("\nThe song's name: " + info[i].name);
      console.log("\nPreview link of the song from Spotify: " + info[i].preview_url);
      console.log("\nThe album that the song is from: " + info[i].album.name);
      console.log("\n==================================================================================================================");
    }
  });
}

var getMovie = function (movieName) {
  request('http://www.omdbapi.com/?apikey=trilogy&t=' + movieName + '&y=plot=short&r=json', function (error, response, body) {
    var jsonData = JSON.parse(body);
    console.log('Title: ' + jsonData.Title);
    console.log('Year released: ' + jsonData.Year);
    console.log('IMDB rating: ' + jsonData.imdbRating);
    console.log('Country where the movie was produced: ' + jsonData.Country);
    console.log('Language: ' + jsonData.Language);
    console.log('Plot: ' + jsonData.Plot);
    console.log('Actors: ' + jsonData.Actors);
    console.log("==================================================================================================================");

  });
}
var doWhatItSays = function () {
  fs.readFile('random.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);

    var dataArr = data.split(',');
    if (dataArr.length == 2) {
      pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length == 1) {
      pick(dataArr[0]);
    }
  }
  )
};

var pick = function (caseData, functionData) {
  switch (caseData) {
    case 'spotify-this-song':
      getSpotify(functionData);
      break;
    case 'movie-this':
      getMovie(functionData);
      break;
    //case 'concert-this':
      //getBandsInfo(functionData);
      //break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log('LIRI does not know that');
  }
}

var runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
}

runThis(process.argv[2], userInput);