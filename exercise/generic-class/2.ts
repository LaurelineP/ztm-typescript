// You are tasked with creating a program for storing and retrieving
// information about books for use in a library system.
//
// Requirements:
// - Create a generic class which can contain any type
// - The class must have the following functionality:
//   - Set initial books from an array of existing books
//   - Add new books
//   - Remove existing books 
//   - Viewing all books
//   - Viewing a subset of books based on a filter function
//
// To confirm that your program has the correct behavior, perform the following:
// - Create a new generic collection of books from the existing `libraryBooks`
//   array
// - Add `book3` to your collection
// - Assert that the total number of books in the collection is 3
// - Remove `book1` from the collection
// - Assert that the total number of books in the collection is 2
// - Retrieve all books written in the year 2023 or later
// - Assert that the total number of books retrieved is 1

import { strict as assert } from "assert";

interface Book {
  title: string;
  author: string;
  year: number;
}

class BooksCollection<T> {
  private readonly books: T[] = [];

  /** Adds either one or multiple books */
  public add(content: T | T[]): void {
    // adds multiple books
    if (content instanceof Array) {
      this.books.push(...content);
    } else {
      // adds one bool
      this.books.push(content);
    }
  }

  /** Removes book on matched title */
  public removeByTitle(bookTitle: string): T {
    const foundBookIdx = this.books.findIndex(book => (
      JSON.stringify(book).includes(bookTitle)
    ));
    return this.books.splice(foundBookIdx, 1)[0];
  }

  public remove(book: T): T | undefined {
    const bookIndex = this.books.findIndex(_book => JSON.stringify(_book) === JSON.stringify(book));
    if (bookIndex === -1) return;
    const removedBookArr = this.books.splice(bookIndex, 1)[0];
    return removedBookArr;
  }

  public getBooks(): T[] {
    return this.books;
  }

  public findByCriteria(property: string, value: string | number): T[] {
    return this.books.filter(book => book[property] === value);
  }
}




const book1 = { title: "Book 1", author: "Author 1", year: 2021 };
const book2 = { title: "Book 2", author: "Author 2", year: 2022 };
const book3 = { title: "Book 3", author: "Author 3", year: 2023 };
const libraryBooks = [book1, book2];



/* --------------------------------- TESTING -------------------------------- */

const collection = new BooksCollection<Book>();

// adding books
collection.add(libraryBooks);
collection.add(book3);

// removes book 1
collection.remove(book1);
const allBooks = collection.getBooks();

//  checks books count
const booksCount = allBooks.length;
console.log('current books count', booksCount)
assert(booksCount === 2);

// retrieves book based on given criterion
const books2023 = collection.findByCriteria('year', 2023);

// checks books count for year 2023
console.log('Books count on same criteria', books2023)
assert(books2023.length === 1);