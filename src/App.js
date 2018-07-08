import React, { Component } from 'react';
import './App.css';
import FormComponent from './common/components/FormComponent.js';
import BookListView from './common/components/BookListView.js';

class App extends Component {
	constructor() {
		super();
		this.state = {
			books: [],
			start: 0
		}

		this.notifyBooks = this.notifyBooks.bind(this);
		
		this.getNextBookSet = this.getNextBookSet.bind(this);

		this.getPreviousBookSet = this.getPreviousBookSet.bind(this);
	}
	
	notifyBooks(books) {
		this.setState({
			books: books.sort( (first, second) => {
				return (new Date(first.volumeInfo.publishedDate) > new Date(second.volumeInfo.publishedDate));
			}),
			start: 0,
			currbooklist: books.slice(0,10)
		})
	}

	getPreviousBookSet(evt) {
		if(this.state.start > 0) {
			this.setState({
				start: this.state.start - 10,
				currbooklist: this.state.books.slice(this.state.start-10,this.state.start)
			});
		}
	}

	getNextBookSet(evt) {
		if(this.state.start < (this.state.books.length - 10)) {
			this.setState({
				start: this.state.start + 10,
				currbooklist: this.state.books.slice(this.state.start+10,this.state.start+20)
			});
		}
	}

	render() {

		return (
		  <div> 
			<FormComponent notifybooks={this.notifyBooks}/>
			{
				(this.state.currbooklist && this.state.currbooklist.length > 0 ) ? 
					<BookListView 
						mostrecentpublicationdate={this.state.books[this.state.books.length - 1].volumeInfo.publishedDate}
						earliestpublicationdate={this.state.books[0].volumeInfo.publishedDate}
						frequentAuthors={this.state.books[0].volumeInfo.authors}
						range={[this.state.start, this.state.start+10, this.state.books.length]}
						books={this.state.currbooklist}
						prevBookSet={this.getPreviousBookSet}
						nextBookSet={this.getNextBookSet} /> : null
			}
		  </div>
		);
	}
}

export default App;
