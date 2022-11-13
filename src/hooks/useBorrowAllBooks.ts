import { useCallback, useState } from "react";
import { BookType } from "../types/book";

export const useBorrowAllBooks = () => {
  const [allBooks, setAllBooks] = useState<Array<BookType>>([]);

  const getBooks = useCallback(() => {
    // const data = client.get({ endpoint: "rental_books" });
    // data
    //   .then((res) => {
    //     console.log(res.contents);
    //   })
    //   .catch(() => {
    //     alert("書籍の取得に失敗しました");
    //   });
    // axios
    //   .get("https://nekotama.microcms.io/api/v1/rental_books" -H "X-API-KEY:" )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch(() => {});
    // const bookList: Array<BookType> = [
    //   {
    //     id: 1,
    //     isbn: 4101010013,
    //     title: "吾輩は猫である",
    //     author: "夏目漱石",
    //     price: 100,
    //     return: new Date(),
    //   },
    //   {
    //     id: 1,
    //     isbn: 4101010012,
    //     title: "銀河鉄道の夜",
    //     author: "芥川龍之介",
    //     price: 100,
    //     return: new Date(),
    //   },
    // ];
    // setAllBooks(bookList);
  }, []);

  return { getBooks, allBooks };
};
