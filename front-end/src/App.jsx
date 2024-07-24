import Homepage from './Pages/Home';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Products from './Pages/Products';
import ProductDetails from './Pages/ProductDetails';


function App() {

  
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/shop" element={<Products />} />
            <Route path="/product" element={<ProductDetails />} />

          </Route>




        </Routes>
      </Router>

    </>
  );
}

export default App;
