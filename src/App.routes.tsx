import { Route, Routes } from "react-router-dom";
import App from "./App";
import CatDetail from "./Cat";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App></App>} />
      <Route path="cats/:catId" element={<CatDetail></CatDetail>} />
    </Routes>
  );
}
