import { Route, Routes } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./modules/HomePage";
import { PageNotFound } from "./modules/PageNotFound";
import { GiveBookPage } from "./modules/GiveBookPage";
import { MyBooksPage } from "./modules/MyBooksPage";
import { BookDetailsPage } from "./modules/BookDetailsPage";
import { SignUpPage } from "./modules/SignUpPage/components/SignUpPage";
import { LoginPage } from "./modules/LoginPage/components/LoginPage/LoginPage";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";
import { BooksPage } from "./modules/BooksPage/components/BooksPage";
import { Redirect } from "./features/auth/Redirect";
import { PrivacyPolicy } from "./modules/PrivacyPolicy";
import { DataDeletion } from "./modules/DataDeletion";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        {/* Unprotected routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<SignUpPage />} />
        <Route path="redirect" element={<Redirect />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="data-deletion" element={<DataDeletion />} />


        {/* Unprotected routes with some protected content */}
        <Route path="books">
          <Route index element={<BooksPage />} />
          <Route path=":bookId?" element={<BookDetailsPage />} />
        </Route>

        {/* authorised-only (protected) routes */}
        <Route element={<ProtectedRoute />} >
          <Route path="give" element={<GiveBookPage />} />
          <Route path="mybooks" element={<MyBooksPage />} />
        </Route>

        {/* Error route */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
