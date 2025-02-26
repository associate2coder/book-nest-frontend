import { Route, Routes } from "react-router-dom";
import { App } from "./App";
import { PrivacyPolicy } from "./modules/PrivacyPolicy/PrivacyPolicy";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/" element={<App />}>
        {/* <Route index element={<HomePage />} /> */}

        {/* More Routes to be added here */}

        {/* <Route path="*" element={<PageNotFound />} /> */}

      </Route>
    </Routes>
  );
};
