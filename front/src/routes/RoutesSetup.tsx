import { Routes, Route } from "react-router-dom";
import { PhotoEmpty } from "components/PhotoEmpty";
import { Loading } from "pages/Loading";
import { Result } from "pages/Result";

import { Select } from "pages/Select";

import Home from "./Home";
import { KAMFNumCount } from "pages/KAMFNumCount";

export default function RouteSetup() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select" element={<Select />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/result" element={<Result />} />
      <Route path="/KAMFNumCount" element={<KAMFNumCount />} />
    </Routes>
  );
}
