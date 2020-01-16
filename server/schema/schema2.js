const graphql = require('graphql');
const _ = require('lodash');


//different properties of graphql package i.e GraphQLObjectType, GraphQLString, GraphQLSchema
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;
// define a book type i.e BookType is the 1st object type here
//relationship on types (we aren't defining any relationship because booktype is realtionship with itself)

//dummy data
var books = [
    { name: 'Name of the wind', genre: ' Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: ' Fantasy', id: '2', authorId: '2' },
    { name: 'The Long Earth', genre: ' Sci-Fi', id: '3', authorId: '3' },
];

var authors = [
    { name: 'patrick', age: 44, id: '1', publisherId: '1' },
    { name: 'B.S', age: 42, id: '2', publisherId: '2' },
    { name: 'Terry', age: 33, id: '3', publisherId: '1'},
];

var publisher = [
    { name: 'Tom Jasery', id: '1' },
    { name: 'Ronaldo', id: '2' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        publisher: {
            type: PublisherType,
            resolve(parent, args){
                return _.find(publisher, {id: parent.publisherId });
            }
        }
    })
});

const PublisherType = new GraphQLObjectType({
    name: 'Publisher',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    })
});



//define a rootquery here
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            //type is book is BookType  beacuse we are querying for booktype
            type: BookType,
            //to know the particular book id we are specifing this
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //args will take the id field as show in the above args
                //code to get the data from DB/other source
                // _.find will find the books based on id
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        publisher: {
            type: PublisherType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(publisher, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

