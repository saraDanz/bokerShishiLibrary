
import mongoose from "mongoose";
import { BookModel } from "../models/book.js";


const getAllBook = async (req, res) => {

    // BookModel.find({}).then(allBooks => {
    //     res.json(allBooks);
    // }).catch(err => {
    //     res.status(400).send("מצטערים התרחשה שגיאה בשליפת הנתונים" + err.message)
    // })
    try {
        let allbooks = await BookModel.find({});
        res.json(allbooks);
    }
    catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה בשליפת הנתונים" + er.message)
    }
}
const getBookById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.bookid))
            return res.status(400).send("קוד לא תקין")
        let book = await BookModel.findById(req.params.bookid);
        if (!book)
            return res.status(404).send("מצטערים לא נמצא ספר עם כזה קוד")
        res.json(book);
    }
    catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה בשליפת הנתונים" + er.message)
    }

}
const deletBookById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("קוד לא תקין")
        let book = await BookModel.findByIdAndDelete(id);
        if (!book)
            return res.status(404).send(" מצטערים לא נמצא ספר עם כזה קוד למחיקה")
        res.json(book);
    }
    catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה במחיקת הנתונים" + er.message)
    }
}

const updateBook = async (req, res) => {
    //אפשר לעדכן ישירות במסד נתונים
    //אפשר לשלוף לעדכן ולשמור
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("קוד לא תקין")
        let bookToUpdate = await BookModel.findById(id);
        if (!bookToUpdate)
            return res.status(404).send(" מצטערים לא נמצא ספר עם כזה קוד לעדכון")

        // bookToUpdate.name = req.body.name || bookToUpdate.name;
        // bookToUpdate.numPages = req.body.numPages || bookToUpdate.numPages;
        // bookToUpdate.author = req.body.author || bookToUpdate.author;
        // bookToUpdate.publishDate = req.body.publishDate || bookToUpdate.publishDate;

        // await bookToUpdate.save();
        // res.json(bookToUpdate);

        await BookModel.findByIdAndUpdate(id, req.body);
        let book = await BookModel.findById(id)
        res.json(book);



    }
    catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה במחיקת הנתונים" + er.message)
    }


}
const addBook = async (req, res) => {

    let { name, numPages, isComix, author, publishDate } = req.body;
    if (!name || !numPages)
        return res.status(404).send("שם ומספר עמודים הם חובה");
    try {
        let sameBook = await BookModel.find({ numPages, name });
        if (sameBook.length > 0)
            return res.status(409).send("כבר קיים ספר עם מספר עמודים ושם זהה ")
        let newBook = new BookModel({ name, numPages, isComix, author, publishDate });
        await newBook.save();
        res.json(newBook);
    } catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה בהוספת הנתונים" + er.message)

    }
}
export { getAllBook, getBookById, addBook, updateBook, deletBookById };