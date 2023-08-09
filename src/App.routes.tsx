import { Route, Routes } from "react-router-dom";
import App from "./App";
import Cats from "./Cats";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App></App>} />
      <Route path="cats" element={<Cats></Cats>} />
    </Routes>
  );
}
