import { FC, useEffect, useState } from "react";
import { Header } from "../organisms/layout/Header";
import { Container, TextField, FormControlLabel, Checkbox, Box, Button } from "@mui/material";
import { useAllBooks } from "../../hooks/useAllBooks";
import { RentalBooksDataGrid } from "../organisms/RentalBooksDataGrid";
import { BookType } from "../../types/book";
import { RegistRentalModal } from "../organisms/RegistRentalModal";
import db from "../../libs/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  setDoc,
  getDoc,
  query,
  where,
  deleteDoc,
  Timestamp as fireTs,
} from "firebase/firestore";

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

  const onCheckRentalBooks = () => {
    if (!bookIds.length) {
      alert("選択されていません");
      return;
    }
    // チェックされた本のリストを作成
    setTotalPrice(0);
    const list = bookIds.map((book_id: any) => {
      const book = allBooks.filter((book) => {
        return book.id === book_id;
      });
      setTotalPrice((prevValue) => prevValue + book[0].price);
      return book[0];
    });
    // idで昇順に並び替える。anyはどうすればよい？
    list.sort((a: any, b: any) => a.id - b.id);
    setSelectedBooks(list);
    setIsOpen(true);
  };

  // 貸出の登録処理
  const onRegistBooks = () => {
    const rentalCollection = collection(db, "rental_books");
    selectedBooks.map((rental) => {
      const book = {
        book_id: rental.book_id,
        user_id: "abcd",
        created_at: fireTs.now(),
        returned_at: fireTs.now(),
      };
      addDoc(rentalCollection, book);
    });
    console.log(selectedBooks);

    alert("レンタルしました");
    setIsOpen(false);
  };

  // 全削除
  const onAllDeleteButton = () => {
    const rentalCollection = collection(db, "all_books");
    getDocs(rentalCollection)
      .then((getAll) => {
        getAll.docs.map((snap) => {
          deleteDoc(doc(db, "all_books", snap.id));
        });
      })
      .catch(() => {
        alert("書籍の取得に失敗しました");
      });
  };

  // レンタル全削除
  const onRentalDeleteButton = () => {
    const rentalCollection = collection(db, "rental_books");
    getDocs(rentalCollection)
      .then((getAll) => {
        getAll.docs.map((snap) => {
          deleteDoc(doc(db, "rental_books", snap.id));
        });
      })
      .catch(() => {
        alert("書籍の取得に失敗しました");
      });
  };

  // 本登録
  const onAllAddButton = () => {
    const bookList: Array<BookType> = [
      { id: 1, title: "吾輩は猫である", author: "夏目漱石", price: 100 },
      { id: 2, title: "銀河鉄道の夜", author: "芥川龍之介", price: 120 },
      { id: 3, title: "ドラゴンボール", author: "鳥山明", price: 200 },
    ];

    const booksCollection = collection(db, "all_books");
    bookList.map((book) => {
      addDoc(booksCollection, book);
    });
  };

  return (
    <>
      <Header pageTitle={"書籍一覧"} />
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Box>
          やり直しボタン
          <Button onClick={onAllDeleteButton}>本全削除</Button>
          <Button onClick={onAllAddButton}>本登録</Button>
          <Button onClick={onRentalDeleteButton}>レンタル削除</Button>
        </Box>

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
          <Button variant="contained" color="primary" type="submit" onClick={onCheckRentalBooks}>
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
