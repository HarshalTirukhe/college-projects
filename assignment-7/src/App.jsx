import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./Home";
import Details from "./Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
