import Homepage from './Pages/Home';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Products from './Pages/Products';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';


function App() {

  
  return (
    <>
      <Router>
        <Routes>
          
          <Route element={<Layout />}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path="/" element={<Homepage />} />
            <Route path="/shop" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>




        </Routes>
      </Router>

    </>
  );
}

export default App;
