let myLibrary = []

const titleInput = document.querySelector("#title-input")
const authorInput = document.querySelector("#author-input")
const pagesInput = document.querySelector("#pages-input")
const readInput = document.querySelector("#read-input")
const addBookBtn = document.querySelector("#add-book-btn")
const bookCardContainer = document.querySelector("#book-card-container")
const formContainer = document.querySelector(".form-container")
const newBookBtn = document.querySelector(".new-book-btn")
const modal = document.querySelector(".modal")
const localStorageBooks = JSON.parse(localStorage.getItem("myLibrary"))

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        this.id = this.generateRandomID()
    }

    addBookToLibrary() {
        myLibrary.unshift(this)
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
        titleInput.value = ""
        authorInput.value = ""
        pagesInput.value = ""
        readInput.checked = false
    }

    generateRandomID() {
        if (this.id) {
            throw "Book already has an ID"
        } else {
            let randomNum = 0
            do {
                const min = 100000
                const max = 999999
                randomNum = Math.floor(Math.random() * (max - min + 1) + min)
            } while (myLibrary.find(obj => obj.id === randomNum)) // Check if ID is repeated
            return randomNum
        }
    }
}

function showLibrary() {
    bookCardContainer.innerHTML = ""  // Delete all cards

    myLibrary.forEach(function(book) {
        const bookCard = document.createElement("div")
    
        bookCard.classList.add("book-card")
        const titleEl = document.createElement("h2")
        titleEl.textContent = `"${book.title}"`
        bookCard.appendChild(titleEl)

        const authorEl = document.createElement("p")
        authorEl.textContent = `${book.author}`
        bookCard.appendChild(authorEl)

        const pagesEl = document.createElement("p")
        pagesEl.textContent = `Total Pages: ${book.pages}`
        bookCard.appendChild(pagesEl)

        const readDiv = document.createElement("div")
        readDiv.classList.add("read-div")
        bookCard.appendChild(readDiv)
            const labelEl = document.createElement("label")
            labelEl.innerHTML = "Read Status"
            readDiv.appendChild(labelEl)

            const readEl = document.createElement("input")
            readEl.type = "checkbox"
            readEl.classList.add("card-checkbox")
            if(book.read) {
                readEl.checked = true
            }
            readDiv.appendChild(readEl)

        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("delete-btn")
        deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>'
        bookCard.appendChild(deleteBtn)

        bookCard.setAttribute("bookID", `${book.id}`)
        bookCardContainer.appendChild(bookCard)

        bookCard.addEventListener("click", (event) => {
            if (event.target.matches("input")) {
                const foundBook = myLibrary.find(book => book.id === parseInt(event.target.parentNode.parentNode.getAttribute("bookID"))) // Find book with matching id
                if (foundBook.read) {
                    foundBook.read = false
                } else {
                    foundBook.read = true
                }
                localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
            }
        })

        deleteBtn.addEventListener("click", (event) => {
            const bookId = event.target.parentNode.parentNode.getAttribute("bookID")
            myLibrary = myLibrary.filter(book => book.id !== parseInt(bookId))
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
            showLibrary()
        })
    })
}

if (localStorageBooks) {
    myLibrary = localStorageBooks
    showLibrary()
} else {
    new Book("To Kill a Mockingbird", "Harper Lee", 336, true).addBookToLibrary()
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false).addBookToLibrary()
    new Book("Pride and Prejudice", "Jane Austen", 432, false).addBookToLibrary()
    new Book("The Catcher in the Rye", "J.D. Salinger", 240, false).addBookToLibrary()
    new Book("1984", "George Orwell", 328, true).addBookToLibrary()
    new Book("The Hobbit", "J.R.R. Tolkien", 310, true).addBookToLibrary()
}

showLibrary()

newBookBtn.addEventListener("click", () => {
    modal.classList.add("open")
    formContainer.classList.add("open")
})

addBookBtn.addEventListener("click", (event) => {
    if(titleInput.value && authorInput.value && pagesInput.value){
        event.preventDefault()
        new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked).addBookToLibrary()
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