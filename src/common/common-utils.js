import axios from 'axios';

export default {
	getRemoteData: (config, func) => {
		let startTime = new Date();
		let endTime = '';
		axios[config['method']](config.url, config.data).then((resp) => {
			endTime = new Date();
			resp.serverResponseTime = (endTime - startTime) / 1000;
			func(resp);
		},
		()=>{
			func('Error occuered');	
		})
	}
}
