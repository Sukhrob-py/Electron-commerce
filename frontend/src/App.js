import { BrowserRouter, Route, Routes } from "react-router-dom";

import Nav from "./components/Layout/Nav/Nav";
import Home from "./pages/Home/Home";
import Footer from "./components/Layout/Footer/Footer";
import Filter from "./pages/Filter/Filter";
import Detail from "./pages/Detail/Detail";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Nav />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/filter" element={<Filter />} />
              <Route path="/filter/detail/:yuid" element={<Detail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
