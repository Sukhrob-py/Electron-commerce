import { BrowserRouter, Route, Routes } from "react-router-dom";

import Nav from "./components/Layout/Nav/Nav";
import Home from "./pages/Home/Home";
import Footer from "./components/Layout/Footer/Footer";
import Filter from "./pages/Filter/Filter";
import Detail from "./pages/Detail/Detail";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import EmailVerification from "./pages/Authentication/EmailVerification";
import UsernamePassword from "./pages/Authentication/UsernamePassword";
import OtherInfos from "./pages/Authentication/OtherInfos";
import Myproducts from "./pages/Myproducts/Myproducts";
import UpdateMyProduct from "./pages/UpdateMyPorduct/UpdateMyProduct";
import AddProduct from "./pages/AddProduct/AddProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Nav>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filter" element={<Filter />} />
                <Route path="/detail/:yuid" element={<Detail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/emailverify" element={<EmailVerification />} />
                <Route
                  path="/usernamepassword"
                  element={<UsernamePassword />}
                />
                <Route path="/otherinfos" element={<OtherInfos />} />
                <Route path="/myproducts" element={<Myproducts />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/update/:yuid" element={<UpdateMyProduct />} />
              </Routes>
            </main>
          </Nav>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
