import { FC, useEffect, useState } from "react";
import { Header } from "../organisms/layout/Header";
import { Container, TextField, FormControlLabel, Checkbox, Box, Button } from "@mui/material";
import { useAllBooks } from "../../hooks/useAllBooks";
import { BorrowBooksDataGrid } from "../organisms/BorrowBooksDataGrid";
import { BookType } from "../../types/book";
import { RegistRentalModal } from "../organisms/RegistRentalModal";
import { useCollection } from "react-firebase-hooks/firestore";
// import db from "../../libs/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useFirestore, useFirebaseApp, useFirestoreCollectionData } from "reactfire";
import { doc, getFirestore } from "firebase/firestore";

export const BorrowBooksList: FC = () => {
  const [bookIds, setBookIds] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Array<BookType>>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { getBooks, allBooks = [] } = useAllBooks();
  const onClose = () => setIsOpen(false);

  // const rentalCollection = collection(useFirestore(), "rental");
  // const { status, data } = useFirestoreCollectionData(rentalCollection);

  // console.log(status);
  // console.log(data);

  useEffect(() => {
    getBooks();
  }, []);

  const onCheckBooks = () => {
    if (!bookIds.length) {
      alert("選択されていません");
      return;
    }

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

  const onRegistBooks = () => {
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
          <FormControlLabel control={<Checkbox defaultChecked />} label="期限超過を表示" />
        </Box>

        <BorrowBooksDataGrid setBookIds={setBookIds} allBooks={allBooks} />
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
