class book {
    constructor(id, name, author, type) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

function deletebook(index)
    {
        
        let booksobj=null;
        let books=localStorage.getItem("books");
        if (books == null) {
            booksobj = [];
        }
        else {
            booksobj = JSON.parse(books);
        }
        booksobj.splice(index,1);
        localStorage.setItem("books",JSON.stringify(booksobj));
        let html="";
        booksobj.forEach((book,index)=> {
            html += `
            <tr>
              <td>${book.id}</td>
              <td>${book.name}</td>
              <td>${book.author}</td>
              <td>${book.type}</td>
              <td><button id="${index}" onclick="deletebook(this.id)" class="btn btn-primary">Delete</button></td>
            </tr>`
        });
        let tbody = document.getElementById("tbody");
        if(booksobj.length!=0)
        {
             tbody.innerHTML = html;
        }
        else
        {
            tbody.innerHTML="Add some books";
        }
    }
class display {
     exp()
    {
        let booksobj=null;
        let books=localStorage.getItem("books");
        if (books == null) {
            booksobj = [];
        }
        else {
            booksobj = JSON.parse(books);
        }
        return booksobj;
    }
    validation(book) {
        let booksobj=this.exp();
        if (book.name.length > 2 && book.author.length > 2 ) {
            const duplicate=booksobj.filter(item=>item.id===book.id)
            if(duplicate.length===0)
            {
                return true;
            }
            else
            {
            return false;
            }
        }
        else {
            console.log('book name and author name cannot be one character long');
            return false;
        }
    }
    addBook(book) {
        let booksobj=this.exp();
        booksobj.push(book);
        localStorage.setItem("books",JSON.stringify(booksobj));
    }
    showBook() {
        let html="";
        let booksobj=this.exp();
        // console.log(booksobj);
        booksobj.forEach((book,index)=> {
            html += `
            <tr class="table-row">
              <td>${book.id}</td>
              <td>${book.name}</td>
              <td>${book.author}</td>
              <td>${book.type}</td>
              <td><button id="${index}" onclick="deletebook(this.id)" class="btn btn-primary">Delete</button></td>
            </tr>`
        });
        let tbody = document.getElementById("tbody");
        if(booksobj.length!=0)
        {
             tbody.innerHTML = html;
        }
        else
        {
            tbody.innerHTML="<h5 style=color:blue;margin-top:12px;><b>Add some books</b></h5>";
        }
    }
    clear() {
        const bookDeatailForm = document.getElementById("bookDetailForm");
        bookDeatailForm.reset();
    }
    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    }
    
}
let display1 = new display();
display1.showBook();
let bookDeatailForm = document.getElementById("bookDetailForm");
bookDeatailForm.addEventListener('submit', (e) => {
    let bookId = document.getElementById("BookId").value;
    let bookName = document.getElementById("BookName").value;
    let bookAuthor = document.getElementById("author").value;
    let bookType;
    let programming = document.getElementById("Programming");
    let literature = document.getElementById("Literature");
    let stories = document.getElementById("Stories");
    if (programming.checked) {
        bookType = programming.value;
    }
    else if (literature.checked) {
        bookType = literature.value;
    }
    else {
        bookType = stories.value;
    }
    let book1 = new book(bookId, bookName, bookAuthor, bookType);
   
    if (display1.validation(book1)) {
        display1.addBook(book1);
        display1.showBook();
        display1.clear();
        display1.show('success', 'Your book has been successfully added')
    }
    else {
        display1.show('danger', 'Book could not be added');
         }

    e.preventDefault();
})
document.getElementById("search").addEventListener('input',()=>
{
    let searchQuery=search.value.toLowerCase();
    let display3 = new display();
    let searchitems=display3.exp();
    let html2="";
    searchitems.forEach((element)=>
    {
        let searchvalues=(element.id+element.name+element.author+element.type).toLowerCase();
        console.log(searchvalues);
        if(searchvalues.includes(searchQuery))
        {
            
            html2+=`<tr class="table-row">
           <td>${element.id}</td>
           <td>${element.name}</td>
           <td>${element.author}</td>
           <td>${element.type}</td>
           <td><button  onclick="deletebook(this.id)" class="btn btn-primary">Delete</button></td>
         </tr>`;
        }
        else
        {
            display3.showBook();
        }
        document.getElementById("tbody").innerHTML=html2;
        
    })
})