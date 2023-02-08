const books = require('./Books');
const { nanoid } = require("nanoid");

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id =  nanoid();
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const book = {
        name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, insertedAt, updatedAt
    }
    const isSuccess = id !== undefined
    if (!isSuccess ||  name === undefined || name ===""){
        //400
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. Mohon isi nama buku",
            cek: isSuccess,
        })
        response.code(400);
        return response
    }else if (readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400);
        return response
    }else if (isSuccess && name !== undefined){
        books.push(book);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                    bookId: id,
                },
        })
        response.code(201)
        return response;
    }else{
        const response = h.response({
            "status": "error",
            "message": "Buku gagal ditambahkan"
        })
        response.code(500)
        return response;
    }
}

const showAllBookHandler = (request, h) =>{
    
    if (request.query.name !== undefined){
        let arr = [];
        const book = books.filter((n) => n.name.toLowerCase().includes(request.query.name.toLowerCase()));
        book.forEach(element => {
            const data = {
                id : element.id,
                name : element.name,
                publisher : element.publisher
            }
            arr.push(data)
        });
        const response = h.response({
            "status": "success",
            "data" :{
                "books": arr
            }
        })
        response.code(200);
        return response;
    }

    //Menampilkan semua berdasarkan parameter ?reading
    if (request.query.reading !== undefined){
        let arr = [];
        const book = books.filter((n) => n.reading === (request.query.reading === "1"));
        book.forEach(element => {
            const data = {
                id : element.id,
                name : element.name,
                publisher : element.publisher
            }
            arr.push(data)
        });
        const response = h.response({
            "status": "success",
            "data" :{
                "books": arr
            }
        })
        response.code(200);
        return response;
    }

    //Menampilkan semua berdasarkan parameter ?finished
    if (request.query.finished !== undefined){
        let arr = [];
        const book = books.filter((n) => n.finished === (request.query.finished === "1"));
        book.forEach(element => {
            const data = {
                id : element.id,
                name : element.name,
                publisher : element.publisher
            }
            arr.push(data)
        });
        const response = h.response({
            "status": "success",
            "data" :{
                "books": arr
            }
        })
        response.code(200);
        return response;
    }
    
     //Menampilkan seluruh isi dari showAllBookHandler
    let arr = [];
        books.forEach(element => {
            const data = {
                id : element.id,
                name : element.name,
                publisher : element.publisher
            }
            arr.push(data)
        });
        const response = h.response({
            "status": "success",
            "data" :{
                "books": arr
            }
        })
        response.code(200);
        return response;
    }

   
    







const showBookByIdHandler = (request, h) =>{
    const { id } = request.params;
    const book = books.filter((n) => n.id === id)[0];
    if (book !== undefined) {
        const response = h.response({
                status: 'success',
                data: {
                    book,
                },
        })
        response.code(200)
        return response
    }
    const response = h.response({
        "status": "fail",
        "message": "Buku tidak ditemukan"
    });
  response.code(404);
  return response;
}

const changeBookByIdHandler = (request, h) =>{
    const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString;

  const index = books.findIndex((n) => n.id === id);


  if (index !== -1) {
    if(name === undefined || name === ""){
        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
      }
      if(readPage > pageCount){
        const response = h.response({
                "status": "fail",
                "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400)
        return response
      }
    books[index] = {
      ...books[index],
      name, year, author, summary, publisher, pageCount, readPage, reading
    };

    const response = h.response({
        "status": "success",
        "message": "Buku berhasil diperbarui"
    });
    response.code(200);
    return response;
  }else if(index < 0){
    
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });
      response.code(404);
      return response;
  }
}

const deleteBookById = (request, h) =>{
    const {id} = request.params
    const note = books.findIndex((n) => n.id === id);
    if (note !== -1) {
        books.splice(note, 1);
            const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        "status": "fail",
        "message": "Buku gagal dihapus. Id tidak ditemukan"
    });
  response.code(404);
  return response;
}


module.exports = {addBookHandler, showAllBookHandler, showBookByIdHandler, changeBookByIdHandler, deleteBookById};