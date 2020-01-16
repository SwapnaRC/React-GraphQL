import React, { Component } from 'react';
//to query will use gql
import { gql } from 'apollo-boost';
//to bind the query to component will use graphql
import { graphql } from 'react-apollo';
import BookDetails from './BookDetails';

//query to get all the books
const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`

class BookList extends Component {

    constructor(props){
        super(props);
        this.state={
            selected: null
        }
    }
displayBooks(){
var data= this.props.data;
console.log("props", this.props);
if(data.loading){
    console.log("data", data);
    return(<div>Loading books...</div>)
}
else{
    return  data.books.map(book =>{
        return(
            <li key={book.id} onClick={(e)=>{this.setState({selected: book.id})}}>{book.name}</li>
        );
    })
}
}
    render() { 
        console.log(this.props.data.books);
        return ( <div>
            <ul id="book-list">
                {this.displayBooks()}
            </ul>
            <BookDetails bookId={this.state.selected}/>
        </div>);
    }
}
 
export default graphql(getBooksQuery)(BookList);