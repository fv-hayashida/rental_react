import { useCallback, useState } from "react";
import { BookType } from "../types/book";
import db from "../libs/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const useAllBooks = () => {
  const [allBooks, setAllBooks] = useState<BookType[]>();
  const getBooks = useCallback(() => {
    const rentalCollection = collection(db, "all_books");
    getDocs(rentalCollection)
      .then((getAll) => {
        const books: BookType[] = [];
        getAll.docs.map((doc) => {
          const book: BookType = {
            book_id: doc.id,
            id: doc.data().id,
            title: doc.data().title,
            author: doc.data().author,
            price: doc.data().price,
          };
          books.push(book);
        });
        console.log(books);
        setAllBooks(books);
      })
      .catch(() => {
        alert("書籍の取得に失敗しました");
      });
  }, []);

  return { getBooks, allBooks };
};
