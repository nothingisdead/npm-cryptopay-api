This is an asynchronous Node.js client for the cryptopay.me API.

It exposes all the API options found here: https://cryptopay.me/api

Example Usage:

```javascript

var cryptopay	= require('cryptopay-api');
var client		= new cryptopay('api_key'); // Fill in with your API key
var id			= Math.floor(Math.random() * 10000000);

var data = {
	id: id,
	price: 1,
	currency: 'EUR',
	callback_params: {
		foo: 'bar'
	}
};

client.invoice(data, function(error, response) {
	console.log(response);
	/**  Prints an object similar to the following:
	 * { uuid: '########-####-####-####-############',
	 *   description: null,
	 *   status: 'pending',
	 *   btc_price: '0.0015',
	 *   btc_address: '##################################',
	 *   short_id: '########',
	 *   callback_params: { foo: 'bar' },
	 *   id: '4303145',
	 *   price: '1.0',
	 *   currency: 'EUR',
	 *   created_at: 1389065150,
	 *   valid_till: 1389065750 }
	 * 
	 */
});


```
