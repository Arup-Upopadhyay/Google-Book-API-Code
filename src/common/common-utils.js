import axios from 'axios';

export default {
	getRemoteData: (config, func) => {
		axios[config['method']](config.url, config.data).then((resp) => {
			func(resp);
		},
		()=>{
			func('Error occuered');	
		})
	}
}
