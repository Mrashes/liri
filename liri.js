const key = require('./key.js')
const Twitter = require('twitter')
// const omdb = require('omdb');
const request = require('request')
const Spotify = require('node-spotify-api')
const file = require('file-system')

if (process.argv[2] === 'trump-tweets'){
	let T = new Twitter(key.twitter)
	//parameters for the api call
	let params = {
		// q: '@realDonaldTrump',
		count: 20,
		// result_type: 'recent',
		// lang: 'en',
		// id: 2379574
		screen_name: '@realDonaldTrump'
	}

	T.get('statuses/user_timeline', params, function(err, data, res) {
		if (!err) {
			// console.log(data)
			console.log(`looking for ${params.screen_name}`)
			// console.log(data)
			//for all the returns
			// console.log(data[1])
			for (let i=0; i<data.length; i++) {
				//use moment to make time stamp
				console.log(data[i]['user']['name'] + " sent at " )
				console.log(data[i]['text'])
				console.log(' ')
			}
		}
		else {
			console.log(err)
		}
	})
}
else if (process.argv[2] === 'spotify-this-song') {
	const s = new Spotify(key.spotify);

	let songName = process.argv[3] || "The Sign"

	// console.log(songName)

	s.search({ type: 'track', query: songName }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		
		console.log('Artist: ' + data.tracks.items[0].artists[0].name)
		console.log('Song Name: ' + data.tracks.items[0].name);
		console.log('Preview Link: ' + data.tracks.items[0].external_urls.spotify);
		console.log('Album: ' + data.tracks.items[0].album.name);

	});
}
else if (process.argv[2] === 'movie-this') {
	let movieName = process.argv[3] || 'Mr. Nobody'
	let keyOMDB = key.omdb.key
	let url = `http://www.omdbapi.com/?apikey=${keyOMDB}&t=${movieName}`

	request(url, function (err, response, body) {
	    if(err){
	      console.log('there was a problem with the API call : '+ err)
	    }
	    else {
	    	let movie = JSON.parse(body)
	    	// console.log(movie['Ratings'])

       		console.log('Title : '+movie['Title']);
       		console.log('Year : '+movie['Year']);
       		console.log('imdb Rating : '+movie['Ratings'][0]['Value']);
       		console.log('Tomato Rating : '+movie['Ratings'][1]['Value']);
       		console.log('Country Filmed in : '+movie['Country']);
       		console.log('Original Language : '+movie['Language']);
       		console.log('Plot : '+movie['Plot']);
       		console.log('Actors : '+movie['Actors']);
	    }
	  });

}
else if (process.argv[2] === 'do-what-it-says') {
	// console.log(file.readFile('/random.txt'))
	//this reads random.txt, need to get that to run the function
	filename = './random.txt';
	file.readFile(filename, 'utf8', function(err, data) {
		if (err) throw err;
		console.log('OK: ' + filename);
		console.log(data)
});
}
else {
	console.log("liri doesn't understand you")
}