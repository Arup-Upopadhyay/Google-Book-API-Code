import React , {Component} from 'react';
import Utils from '../common-utils.js'
import './FormComponent.css';
import './BookListView.css';

export default class FormComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			names: '',
			title: ''
		};

		this.handleSearch = this.handleSearch.bind(this);

		this.handleReset = this.handleReset.bind(this);

		this.notifySearchResult = props.notifybooks;
	}

	render() {
		return(
			<div className={'bookstore-form'}>
				<div className={'form-name-section'}>
					<label htmlFor='names'>Comma Seperated Author Names:</label>
					<input 
							type='text' 
							onChange={(evt) => this.setState({names: evt.target.value})} 
							id='names' value={this.state.names}/>
				</div>
				<div className={'form-title-section'}>
					<label htmlFor='title'>Title of the Book:</label>
					<input 
							type='text' 
							id='title' value={this.state.title} 
							onChange={(evt) => this.setState({title: evt.target.value})} />
				</div>
				<div className={'form-btn-section'}>
					<input type='button' value='search' onClick={this.handleSearch} />
					<input type='button' value='reset' onClick={this.handleReset}   />
				</div>
			</div>
		);
	}

	handleSearch (evt) {
			Utils.getRemoteData({method: 'post', url: 'http://localhost:3000/findbooks/', 
								data: {names: this.state.names, title: this.state.title}},
				(response)=>{
					this.notifySearchResult(response.data.items);
			});
	}

	handleReset (evt) {
		this.setState({
			names: '',
			title: ''
		})	
	}
}
