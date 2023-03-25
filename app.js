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

addBookToLibrary(new Book("To Kill a Mockingbird", "Harper Lee", 336, false, 0))
addBookToLibrary(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true, 1))
addBookToLibrary(new Book("The Catcher in the Rye", "J.D. Salinger", 224, false, 2))
addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 300, false, 3))
addBookToLibrary(new Book("Pride and Prejudice", "Jane Austen", 432, false, 4))
addBookToLibrary(new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 223, false, 5))

function addBookToLibrary(userBook) {
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

        const readDiv = document.createElement("div")
        bookCard.appendChild(readDiv)
            const labelEl = document.createElement("label")
            labelEl.innerHTML = "Read?"
            readDiv.appendChild(labelEl)

            const readEl = document.createElement("input")
            readEl.type = "checkbox"
            readEl.classList.add("card-checkbox")
            if(book.read) {
                readEl.checked = true
            }
            bookCard.appendChild(readEl)

        const idEl = document.createElement("p")
        idEl.textContent = `ID: ${book.id}`
        bookCard.appendChild(idEl)
        
        bookCardContainer.appendChild(bookCard)

        bookCard.addEventListener("click", (event) => {
            if (event.target.matches("input")) {
                console.log(event.target.parentNode.lastChild.innerHTML)
                const foundBook = myLibrary.find(obj => obj.id === event.target.parentNode.lastChild.innerHTML) // Find book with matching id
                if (foundBook.read) {
                    foundBook.read = false
                } else {
                    foundBook.read = true
                }
                console.log(foundBook)
            }
        })
    })
}

showLibrary()

newBookBtn.addEventListener("click", () => {
    modal.classList.add("open")
    formContainer.classList.add("open")
})

let bookID = 5
addBookBtn.addEventListener("click", (event) => {
    if(titleInput.value && authorInput.value && pagesInput.value){
        event.preventDefault()
        addBookToLibrary(new Book(titleInput.value, authorInput.value, pagesInput.value, readInput, bookID += 1))
        showLibrary()
        modal.classList.remove("open")
        formContainer.classList.remove("open")
    }
})

modal.addEventListener("click", (event) => {
    if(event.target.classList.contains("modal")) {
        modal.classList.remove("open")
        formContainer.classList.remove("open")
    }
})