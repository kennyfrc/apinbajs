// node requirement. installed via npm.
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makeRequest() {

	// Setup the request URL
	var url = "https://www.balldontlie.io/api/v1/stats?player_ids[]=274&seasons[]=2018&postseason=true"

	// Create the XHR request
	var request = new XMLHttpRequest(); // not needed if you're using index.html. needed if just node.

	// Return it as a Promise
	/* A promise is a returned object to which you attach callbacks, 
	instead of passing callbacks into a function. The benefit of this is that
	because of 'callback hell', code becomes unmanageable. So by adding 
	resolve and reject states, the problem gets cut very early on. */
	return new Promise(function (resolve, reject) {

		// Setup our HTTP requestj
		request.open('GET', url, true);

		// Setup our listener to process compeleted requests
		// whenever you see the word listener, it's a CALLBACK
		request.onreadystatechange = function () { // CALLBACK FUNCTION

			// Only run if the request is complete
			// The XMLHttpRequest.readyState property returns the state an XMLHttpRequest client is in
			// Wait until it's 4. Otherwise, keep running it (??? - it seems to loop)
			if (request.readyState !== 4) return;

			// Process the response
			if (request.status >= 200 && request.status < 300) {
				// If successful, return the XMLHttpRequest
				resolve(request);
			} else {
				// If failed
				reject({
					status: request.status,
					statusText: request.statusText
				});
			}

		};

		// Send the request
		request.send();

	});
};

function getStats() {
	makeRequest().then(function (returnedXHPObject) {
		console.log(JSON.parse(returnedXHPObject.responseText).data.reverse());
	})
}

getStats();