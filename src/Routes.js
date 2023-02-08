/* eslint-disable no-undef */
const { addBookHandler, showAllBookHandler,showBookByIdHandler, changeBookByIdHandler, deleteBookById } = require("./Handler");

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: showAllBookHandler,
    },
    {
        method:'POST',
        path:'/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: showBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: changeBookByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookById,
    },
]

module.exports = routes;