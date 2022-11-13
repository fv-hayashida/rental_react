import { FC, useEffect, useState } from "react";
import { Header } from "../organisms/layout/Header";
import { Container, TextField, FormControlLabel, Checkbox, Box, Button } from "@mui/material";
import { useAllBooks } from "../../hooks/useAllBooks";
import { RentalBooksDataGrid } from "../organisms/RentalBooksDataGrid";
import { BookType } from "../../types/book";
import { RegistRentalModal } from "../organisms/RegistRentalModal";
import db from "../../libs/firebaseConfig";
import { collection, getDocs, doc, addDoc, setDoc, getDoc, query, where } from "firebase/firestore";

export const LendingBooksList: FC = () => {
  const [bookIds, setBookIds] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Array<BookType>>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { getBooks, allBooks = [] } = useAllBooks();
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    getBooks();
  }, []);

  const onCheckBooks = () => {
    if (!bookIds.length) {
      alert("選択されていません");
      return;
    }

    //合計金額を計算
    setTotalPrice(0);
    const list = bookIds.map((bookId: any) => {
      const book = allBooks[bookId - 1];
      setTotalPrice((prevValue) => prevValue + book.price);
      return book;
    });

    // idで昇順に並び替える。anyはどうすればよい？
    list.sort((a: any, b: any) => a.id - b.id);
    setSelectedBooks(list);
    setIsOpen(true);
  };

  // 貸出の登録処理
  const onRegistBooks = () => {
    const rentalCollection = collection(db, "all_books");
    getDocs(rentalCollection)
      .then((getAll) => {
        const books: BookType[] = [];
        getAll.docs.map((doc) => {
          const book: BookType = {
            id: doc.data().id,
            title: doc.data().title,
            author: doc.data().author,
            price: doc.data().price,
          };
          books.push(book);
        });
        console.log(books);
      })
      .catch(() => {
        alert("貸出登録に失敗しました");
      });

    alert("rental");
    setIsOpen(false);
  };

  return (
    <>
      <Header pageTitle={"書籍一覧"} />
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <TextField
            id="outlined-basic"
            label="検索"
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
          />
        </Box>

        <RentalBooksDataGrid setBookIds={setBookIds} allBooks={allBooks} />

        <Box sx={{ width: "full", textAlign: "right", mt: 2, mr: 4 }}>
          <Button variant="contained" color="primary" type="submit" onClick={onCheckBooks}>
            レンタル確認
          </Button>
        </Box>
      </Container>

      <RegistRentalModal
        selectedBooks={selectedBooks}
        isOpen={isOpen}
        onClose={onClose}
        onRegistBooks={onRegistBooks}
        totalPrice={totalPrice}
      />
    </>
  );
};
