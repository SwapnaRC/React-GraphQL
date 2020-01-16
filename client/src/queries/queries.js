//to query will use gql
import { gql } from 'apollo-boost';

//query to get all the books
const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`

//query to get all the books
const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}
`

// we can give name to mutation AddBook ($name: String!...) etc
const addBookMutation = gql`
mutation AddBook($name:String!,$genre:String!,$authorId: ID!){
    addBook(name:$name, genre:$genre, authorId:$authorId){
            name
            id
        }
}
`

//get particular book
const getBookQuery = gql `
query($id:ID){
    book(id: $id){
        id
        name
        genre
        author{
            id
            name
            age
            books{
                name
                id
            }
        }
    }
}
`
export { getAuthorsQuery,getBooksQuery, addBookMutation, getBookQuery };

