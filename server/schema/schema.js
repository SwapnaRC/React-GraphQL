const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

//different properties of graphql package i.e GraphQLObjectType, GraphQLString, GraphQLSchema
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt, 
    GraphQLList,
    GraphQLNonNull
} = graphql;
// define a book type i.e BookType is the 1st object type here
//relationship on types (we aren't defining any relationship because booktype is realtionship with itself)

//dummy data
// var books = [
//     { name: 'Name of the wind', genre: ' Fantasy', id: '1', authorId: '1' },
//     { name: 'The Final Empire', genre: ' Fantasy', id: '2', authorId: '2' },
//     { name: 'The Long Earth', genre: ' Sci-Fi', id: '3', authorId: '2' },
//     { name: 'I too had a love story', genre: ' Fiction', id: '1', authorId: '4' },
//     { name: 'This is not your story', genre: ' Fiction', id: '2', authorId: '3' },
//     { name: 'Everyone has a story', genre: ' Fiction', id: '3', authorId: '3' },
// ];

// var authors = [
//     { name: 'patrick', age: 44, id: '1' },
//     { name: 'B.S', age: 42, id: '2' },
//     { name: 'Terry', age: 33, id: '3' },
//     { name: 'Ravidra Sing', age: 43, id: '4' },
// ];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                //return _.find(authors, { id: parent.authorId });
                return Author.findById(parent.authorId);
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
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
               // return _.filter(books, { authorId: parent.id})
               return Book.find({authorId: parent.id});
            }
        }
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
               // return _.find(books, { id: args.id });
               return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id });
                return Author.findById(args.id);

            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
               // return books;
               return Book.find({});
            }
        }, 
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
               // return authors;
               return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor: {
            type: AuthorType,
            args: { 
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: {type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                //Author is model
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                //save in db
              return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: {type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve (parent, args){
                console.log(args);
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                //save and return from DB
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

