import Homepage from './Pages/Home';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './Layout';
import Products from './Pages/Products';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import { useSelector } from 'react-redux';
import Checkout from './Pages/Checkout';


function App() {

  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  return (
    <>
      <Router>
        <Routes>

          <Route element={<Layout />}>

            <Route path="/" element={<Homepage />} />
            <Route path='/login' element={userInfo ? <Navigate to="/"/> : <Login />} />
            <Route path='/register' element={userInfo ? <Navigate to="/"/> : <Register /> } />
            
            <Route path="/shop" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          {/* <Route path='/cart' element={<Cart /> } /> */}



        </Routes>
      </Router>

    </>
  );
}

export default App;
