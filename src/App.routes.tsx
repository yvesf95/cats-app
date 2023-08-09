import { Route, Routes } from "react-router-dom";
import App from "./App";
import CatPage from "./cats/Cat";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App></App>} />
      <Route path="cats/:catId" element={<CatPage></CatPage>} />
    </Routes>
  );
}
