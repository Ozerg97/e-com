import Homepage from './Pages/Home';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './Layout';
import Products from './Pages/Products';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import { useSelector } from 'react-redux';
import Checkout from './Pages/Checkout';
import OrderHistory from './Pages/OrderHistory';
import OrderConfirmation from './Pages/OrderConfirmation';
import Contact from './Pages/Contact';
import Faq from './Pages/Faq';
import ReturnPolicy from './Pages/RefundPolicy';
import RefundPolicy from './Pages/RefundPolicy';
import TermsOfService from './Pages/TermsOfService';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import ShippingDelivery from './Pages/ShippingDelivery';

function App() {

  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  return (
    <>
      <Router>
        <Routes>

          <Route element={<Layout />}>

            <Route path="/" element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={userInfo ? <Navigate to="/"/> : <Register /> } />
            
            <Route path="/shop" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={!userInfo ? <Navigate to="/login"/>: <Checkout/>} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order/:id" element={<OrderConfirmation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/shipping-delivery" element={<ShippingDelivery />} />
            

          </Route>
          



        </Routes>
      </Router>

    </>
  );
}

export default App;
