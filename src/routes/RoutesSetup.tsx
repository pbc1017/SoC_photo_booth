import { Routes, Route } from "react-router-dom";
import { PhotoEmpty } from "components/PhotoEmpty";
import { Loading } from "pages/Loading";
import { Result } from "pages/Result";

import { Select } from "pages/Select";

import Home from "./Home";

export default function RouteSetup() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select" element={<Select />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}
