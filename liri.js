const key = require('./key.js')
const Twitter = require('twitter')
// const omdb = require('omdb');
const request = require('request')
const Spotify = require('node-spotify-api')

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
	var s = new Spotify(key.spotify);
	 
	s.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	console.log(data.tracks.items); 
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
	
}
else {
	console.log("liri doesn't understand you")
}