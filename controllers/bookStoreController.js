const request = require('axios');
const url = 'https://www.googleapis.com/books/v1/volumes?q=Harry+inauthor:J.K';

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

		req.body.names.split(',').forEach( (name) => {
			authorNames += name;
		});
		
		if(title && title.length) {
			arrParams.push('intitle:' + title);
		}
		if(authorNames && authorNames.length) {
			arrParams.push('inauthor:' + authorNames);
		}
		remoteUrl += (arrParams.length > 1 ? arrParams.join('+') : arrParams[0]);
		remoteUrl += '&maxResults=40';
		getRemoteData(remoteUrl).then((data) => res.send(data) , (err)=> console.log(err));
	}	
};
