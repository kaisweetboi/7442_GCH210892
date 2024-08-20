const mongoose = require('mongoose')
const BookSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      genre: String,
      price: {
         type: Number,
         required: true,
         min: [1, 'Lowest price must be 1$'],
         max: 1000
      },
      cover: String,
      //1 publisher - many books
      publisher: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'publishers'    //name of referenced collection (table)
      }
   },
   {
      versionKey: false
   }
)
const BookModel = mongoose.model('books', BookSchema)  //books: table name
module.exports = BookModel