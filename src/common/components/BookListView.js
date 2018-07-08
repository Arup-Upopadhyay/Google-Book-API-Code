import React, {Component} from 'react';


const ViewItem = (props) => {

	return(
		<div className={'book-item'}
			onClick = {(evt)=>{
				props.notifySelectedBookItem(props.index);
			}} >
			<span>{`Title:  ${props.title ? props.title : 'Title not available'}`}</span>			
			<span>{`Author: ${props.author ? props.author : 'Author names not available'}`}</span>		
			{
				props.showDiscription === true ?
					<span>{`Description: ${props.description ? props.description : 'Read the Book to know more about it.'}`}</span> : null
			}
		</div>
	);	
};

export default class BookListView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selindex: -1	
		};

		this.notifySelectedBookItem = this.notifySelectedBookItem.bind(this);

	}

	notifySelectedBookItem (index) {
		this.setState({
			selindex: index
		});
	}

	render() {

		const books = this.props.books.sort( (first, second) => {
			first = new Date(first.volumeInfo.publishedDate);
			second = new Date(second.volumeInfo.publishedDate);
			return first > second;
		});
		return(
			<div className={'book-shelf'}>
				<div className={'request-stats'}>
					<h6>Most Frequent Authors: {this.props.frequentAuthors}</h6>
					<h6>Earliest publication date: {this.props.earliestpublicationdate}</h6>
					<h6>Recent publication date: {this.props.mostrecentpublicationdate}</h6>
				</div>
				<div>
					<div className={'book-stats'}>
						<span>{`Showing books  ${this.props.range[0]} to ${this.props.range[1]} , Total results: ${this.props.range[2]}`}</span>
					</div>
					<div className={'pagination'}>
						<button onClick={ (evt) => {
								this.setState({
									selindex: -1
								}, this.props.prevBookSet(evt))
						}}>prev</button>
						<button onClick={ (evt) => {
							this.setState({
								selindex: -1
							},this.props.nextBookSet(evt))
						}}>next</button>
					</div>			
					<div className={'books-list'}>
						{
							this.props.books.map( (book, pos) => {
								const authors = (book.volumeInfo.authors && book.volumeInfo.authors.length) ? 
												book.volumeInfo.authors.join(',') : 'UnKnown Author';
								return (<ViewItem 
											showDiscription={ this.state.selindex === pos ? true : false}
											notifySelectedBookItem = {this.notifySelectedBookItem}
											key={pos} 
											index={pos} 
											title={book.volumeInfo.title} 
											description={book.volumeInfo.description}
											author={authors} />)
							})
						}
					</div>
				</div>
			</div>
		);
	}	
};
