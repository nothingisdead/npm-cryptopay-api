var request = require('request');

/**
 * Cryptopay connects to the Cryptopay.me API
 * @param {String} key API Key
 */
function Cryptopay(key) {
	var self = this;

	var config = {
		url: 'https://cryptopay.me/api/v1',
		key: key
	};

	/**
	 * This method makes an API invoice request.
	 * @param  {Object}   parameters  The API method (public or private)
	 * @param  {Function} callback    A callback function to be executed when the request is complete
	 * @return {Object}               The request object
	 */
	function invoice(parameters, callback) {
		var method			= 'invoices';
		var required_params	= ['price', 'currency'];
		var optional_params	= ['description', 'id', 'callback_params', 'success_redirect_url', 'error_redirect_url', 'callback_url'];
		var request_url		= config.url + '/' + method + '?api_key=' + config.key;

		// Check params argument
		if(typeof parameters === 'undefined') {
			throw new Error('The first parameter must be an object containing at least the required arguments.');
		}

		// Check for required parameters
		for(var i in required_params) {
			var param = required_params[i];
			if(typeof parameters[param] === 'undefined') {
				throw new Error('Missing required parameter: "' + param + '."');
			}
		}

		// Check for unknown parameters
		for(var i in parameters) {
			if(optional_params.indexOf(i) === -1 && required_params.indexOf(i) === -1) {
				console.warn('Unknown parameter: "' + i + '."');
			}
		}

		return rawRequest(request_url, parameters, callback);
	}

	/**
	 * This method sends the actual HTTP request
	 * @param  {String}   url         The URL to make the request
	 * @param  {Object}   parameters  POST body
	 * @param  {Function} callback    A callback function to call when the request is complete
	 * @return {Object}               The request object
	 */
	function rawRequest(url, parameters, callback) {
		// Set custom User-Agent string
		headers = {
			'User-Agent': 'Cryptopay Javascript API Client'
		};

		var options = {
			url: url,
			method: 'POST',
			headers: headers,
			form: parameters
		};

		var req = request.post(options, function(error, response, body) {
			if(typeof callback === 'function') {
				var data = {};

				if(error) {
					callback.call(self, new Error('Error in server response: ' + JSON.stringify(error)));
				}

				try {
					data = JSON.parse(body);
				} catch(e) {
					return callback.call(self, new Error('Could not understand response from server: ' + body));
				}
				
				callback.call(self, null, data);
			}
		});

		return req;
	}

	self.invoice = invoice;
}

module.exports = Cryptopay;