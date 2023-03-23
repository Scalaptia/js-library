const titleInput = document.querySelector("#title-input")
const authorInput = document.querySelector("#author-input")
const pagesInput = document.querySelector("#pages-input")
const readInput = document.querySelector("#read-input")
const addBookBtn = document.querySelector("#add-book-btn")


let myLibrary = []

function Book(title, author, pages, read, id) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = id
    this.info = () => {
        if (this.read) {
            readStatus = "already read"
        } else {
            readStatus = "not read yet"
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`
    }
}

const TPAB = new Book("TPAB", "Kendrick Lamar", 18, true, 0)


let bookID = 0
function addBookToLibrary() {
    bookID += 1
    const userBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked, bookID)
    console.log(userBook.info())
    myLibrary.push(userBook)
}

addBookBtn.addEventListener("click", () => {
    addBookToLibrary()
    console.log("clicked")
})