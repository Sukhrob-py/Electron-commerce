import { BrowserRouter, Route, Routes } from "react-router-dom";

import Nav from "./components/Layout/Nav/Nav";
import Home from "./pages/Home/Home";
import Footer from "./components/Layout/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Nav />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
