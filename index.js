const library = [];
const libraryElement = document.querySelector('.library');

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.id = crypto.randomUUID()
}


function addBook(title, author, numPages, read) {
    const newBook = new Book(title, author, numPages, read);
    library.push(newBook);
}
function toggleRead(e) {

}
function createBookElements() {
    library.forEach((book) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");

        const title = document.createElement("p");
        title.innerText = book.title;
        title.classList.add("title");

        const author = document.createElement("p");
        author.innerText = book.author;
        author.classList.add("author");

        const numPages = document.createElement("p");
        numPages.innerText = "Pages: " + book.numPages;
        numPages.classList.add("numPages");

        const readWrapper = document.createElement("div");
        readWrapper.classList.add("read");
        const readLabel = document.createElement("p")
        readLabel.innerText = "Read?"
        const read = document.createElement('input');
        read.type = "checkbox";
        read.checked = book.read;
        read.addEventListener("change", (e) => {
            const bk = library.find(b => b.id === book.id);
            bk.read = !bk.read;
            library.forEach((book) => {
                console.log(book);})
        });

        readWrapper.appendChild(readLabel)
        readWrapper.appendChild(read);
        bookElement.appendChild(title)
        bookElement.appendChild(author)
        bookElement.appendChild(numPages)
        bookElement.appendChild(readWrapper)

        libraryElement.appendChild(bookElement);
    })
}

addBook("Dune", "Frank Herbert", 604, false);
addBook("To Kill A Mockingbird", "Harper Lee",  324, false);
addBook("Harry Potter And the Sorcerers Stone", "J.K. Rowling", 309, true);


library.forEach(book => {
    console.log(book);
});

createBookElements();