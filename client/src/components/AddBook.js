import React, { Component } from 'react';
//to bind the query to component will use graphql
//compose is used to compose 2 or more queries
import { graphql } from 'react-apollo';
// import { compose } from "recompose";
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: "",

        };
    }

    displayAuthors() {
        //this .props.getAuthorsQuery bcz in export file we gave name as getAuthorsQuery
        var data = this.props.getAuthorsQuery;
        console.log('this.getAuthorsQuery', this.props.getAuthorsQuery);
        console.log('this.props', this.props);
        // if loading is true 
        if (data.loading) {
            return (<option>Loading Authors</option>)
        }
        // else loading is false
        else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    submitForm(e) {
        e.preventDefault();
        // console.log(this.state);
        //to add the values to book
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            //it will refetch the query 
            refetchQueries:[{query: getBooksQuery}]
        });
    }
    render() {
        return (<form id="add-book" onSubmit={this.submitForm.bind(this)}>

            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
            </div>

            <div className="field">
                <label>author</label>
                <select onChange={(e) => this.setState({ authorId: e.target.value })}>
                    <option>--Select Author--</option>
                    {this.displayAuthors()}
                </select>
            </div>
            <div className="field">
                <button>Add Book</button>
            </div>
        </form>);
    }
}

//several queries bind together in one export file 
export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)
    (AddBook);
