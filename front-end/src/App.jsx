import Homepage from './Pages/Home';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './Layout';
import Products from './Pages/Products';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import { useSelector } from 'react-redux';


function App() {

  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  return (
    <>
      <Router>
        <Routes>

          <Route element={<Layout />}>

            <Route exact path="/" element={<Homepage />} />
            <Route exact path='/login' element={userInfo ? <Navigate to="/"/> : <Login />} />
            <Route exact path='/register' element={userInfo ? <Navigate to="/"/> : <Register /> } />

            <Route exact path="/shop" element={<Products />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />

          </Route>




        </Routes>
      </Router>

    </>
  );
}

export default App;
