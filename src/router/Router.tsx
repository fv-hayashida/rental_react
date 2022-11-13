import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { Mypage } from "../components/pages/Mypage";
import { LendingBooksList } from "../components/pages/LendingBooksList";
import { BorrowBooksList } from "../components/pages/BorrowBooksList";

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/mypage" element={<Mypage />}></Route>
      <Route path="/rental" element={<LendingBooksList />}></Route>
      <Route path="/borrow" element={<BorrowBooksList />}></Route>

      <Route path="*" element={<Navigate to="/" />} />
      {/* <Route path="*" element={<Page404 />} /> */}
    </Routes>
  );
};
