import { Route, Routes } from "react-router-dom";
import { App } from "./App";
import { PageNotFound } from "./modules/PageNotFound";
import { MyBooksPage } from "./modules/MyBooksPage/components/MyBooksPage";
import { SignUpPage } from "./modules/SignUpPage/components/SignUpPage";
import { LoginPage } from "./modules/LoginPage/components/LoginPage/LoginPage";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";
import { BooksPage } from "./modules/BooksPage/components/BooksPage";
import { BookDetailsPage } from "./modules/BookDetailsPage/components/BooksDetailsPage";
import { GiveBookPage } from "./modules/GiveBookPage/components/GiveBookPage";
import { Redirect } from "./features/auth/Redirect";
import { PrivacyPolicy } from "./modules/PrivacyPolicy";
import { DataDeletion } from "./modules/DataDeletion";
import { CartPage } from "./modules/CartPage/components/CartPage";
import { BooksPageAlt } from "./modules/BooksPage/components/BooksPage/BooksPageAlt";
import { HomePage } from "./modules/HomePage/components/HomePage";

export const AppRoutes: React.FC = () => {
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
          <Route path=":slug?" element={<BookDetailsPage />} />
        </Route>

        {/* authorised-only (protected) routes */}
        <Route element={<ProtectedRoute />} >
          <Route path="give" element={<GiveBookPage/>} />
          <Route path="cart" element={<CartPage />}/>
          <Route path="mybooks" >
            <Route index element={<MyBooksPage />} />
            <Route path="given" element={<BooksPageAlt />} />
            <Route path="taken" element={<BooksPageAlt />} />
            <Route path="favourites" element={<BooksPageAlt />} />
          </Route>
        </Route>

        {/* Error route */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
