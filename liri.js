const key = require('./key.js')
const Twitter = require('twitter')
// const omdb = require('omdb');
const mdb = require('moviedb')(key.moviedb.key)
const request = require("request");

if (process.argv[2] === 'trump-tweets'){
	let T = new Twitter(key.twitter)
	//parameters for the api call
	let params = {
		q: '@realDonaldTrump',
		count: 20,
		result_type: 'recent',
		lang: 'en',
		// id: 2379574
	}

	T.get('search/tweets', params, function(err, data, res) {
		if (!err) {
			// console.log(data)
			console.log(`looking for ${params.q}`)
			//for all the returns
			for (let i=0; i<data.statuses.length; i++) {
				console.log(data.statuses[i])
			}
		}
		else {
			console.log(err)
		}
	})
}
else if (process.argv[2] === 'spotify-this-song') {

}
else if (process.argv[2] === 'movie-this') {
	//get the movie id
	let movieName = process.argv[3]
	mdb.searchMovie({ query: movieName }, (err, res) => {
	  console.log(res);
	  // return 
	});


	// var movieid = 121518;
	// var options = { method: 'GET',
	//   url: 'https://api.themoviedb.org/3/movie/'+movieid+'/credits',
	//   qs: { api_key: key.moviedb.key },
	//   body: '{}' };

	// request(options, function (error, response, body) {
	//   if (error) throw new Error(error);

	//   console.log(body);
	// });

	//
	// var options = { method: 'GET',
	//   url: 'https://api.themoviedb.org/3/movie/'+movieid,
	//   qs: { language: 'en-US', api_key: api_key: key.moviedb.key },
	//   body: '{}' };

	// request(options, function (error, response, body) {
	//   if (error) throw new Error(error);

	//   console.log(body);
	// });
}
else if (process.argv[2] === 'do-what-it-says') {
	
}
else {
	console.log("liri doesn't understand you")
}