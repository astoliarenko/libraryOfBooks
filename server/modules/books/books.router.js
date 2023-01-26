const Router = require("express");
const router = new Router();
const controller = require("./books.controller");

router.post("/addBook", controller.addNewBook);
router.get("/books", controller.getBooks);
router.get("/genres", controller.getBookGenres);

module.exports = router;