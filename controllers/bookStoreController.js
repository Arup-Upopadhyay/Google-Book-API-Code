const request = require('axios');

function getRemoteData(url,method='get') {
	return new Promise(function(resolve, reject){
		request[method](url).then((res)=>{
			resolve(res.data);
		},(err) =>{
			console.log('Something went wrong:', err);
		});
	});	
};

module.exports = {
	findBooks: function(req, res) {
		let authorNames = '';
		let remoteUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
		let arrParams = []
		const title = req.body.title;
		const promises = [];

		
		remoteUrl += `inauthor:${req.body.names.split(',').join('+')}+intitle:${title}&maxResults=40`;

		getRemoteData(remoteUrl).then((data) => res.send(data) , (err)=> console.log(err));
	}	
};
