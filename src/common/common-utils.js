import axios from 'axios';

export default {
	getRemoteData: (config, func) => {
		let startTime = new Date();
		let endTime = '';
		axios[config['method']](config.url, config.data).then((resp) => {
			endTime = new Date();
			console.log(resp);
			resp.serverResponseTime = (endTime - startTime) / 1000;
			func(resp);
		},
		()=>{
			func('Error occuered');	
		})
	},
	getMostFrequentAuthor(books) {
		const map = {};
		let freqName = '';
		let freqCnt = 0;

		books.forEach( (book) => {
			book.volumeInfo.authors.forEach( (name) => {
				if(!map[name]) {
					map[name] = 1;
				}
				else {
					map[name] += 1;
				}
			});
		});
		
		for(var key in map) {
			if(map.hasOwnProperty(key)) {
				if(map[key] > freqCnt) {
					freqCnt = map[key];
					freqName = key;
				}
			}
		}
		return freqName;
	}
}
