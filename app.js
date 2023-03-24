const titleInput = document.querySelector("#title-input")
const authorInput = document.querySelector("#author-input")
const pagesInput = document.querySelector("#pages-input")
const readInput = document.querySelector("#read-input")
const addBookBtn = document.querySelector("#add-book-btn")
const bookCardContainer = document.querySelector("#book-card-container")
const formContainer = document.querySelector(".form-container")
const newBookBtn = document.querySelector(".new-book-btn")
const modal = document.querySelector(".modal")

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

const defaultxd = new Book("Default Title", "Author", 420, true, 0)
myLibrary.push(defaultxd)
const defaultxdd = new Book("Default Title", "Author", 420, true, 0)
myLibrary.push(defaultxd)
const defaultxddd = new Book("Default Title", "Author", 420, true, 0)
myLibrary.push(defaultxd)
const defaultxdddd = new Book("Default Title", "Author", 420, true, 0)
myLibrary.push(defaultxd)


let bookID = 0
function addBookToLibrary() {
    const userBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked, bookID += 1)
    console.log(userBook.info())
    myLibrary.push(userBook)
    titleInput.value = ""
    authorInput.value = ""
    pagesInput.value = ""
    readInput.checked = false
}

function showLibrary() {
    bookCardContainer.innerHTML = ""  // Delete all cards

    myLibrary.forEach(function(book) {
        const bookCard = document.createElement("div")
    
        bookCard.classList.add("book-card")
        const titleEl = document.createElement("h2")
        titleEl.textContent = book.title
        bookCard.appendChild(titleEl)

        const authorEl = document.createElement("p")
        authorEl.textContent = `Author: ${book.author}`
        bookCard.appendChild(authorEl)

        const pagesEl = document.createElement("p")
        pagesEl.textContent = `Total Pages: ${book.pages}`
        bookCard.appendChild(pagesEl)

        bookCardContainer.appendChild(bookCard)
    })
}

showLibrary()

newBookBtn.addEventListener("click", () => {
    modal.classList.add("open")
    formContainer.classList.add("open")
})

addBookBtn.addEventListener("click", (event) => {
    if(titleInput.value && authorInput.value && pagesInput.value){
        event.preventDefault()
        addBookToLibrary()
        showLibrary()
        modal.classList.remove("open")
        formContainer.classList.remove("open")
    }
})