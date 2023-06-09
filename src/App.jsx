import React from 'react';
import { Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import SearchBox from './components/SearchBox';



function App() {
  return (
    <>
      <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path="/login" element={<LoginScreen/>}/>
              <Route path="/register" element={<RegisterScreen/>}/>
              <Route path="/profile" element={<ProfileScreen/>}/>
              <Route path="/product/:id" element={<ProductScreen/>}/>
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen/>}/>
              <Route path="/order/:id" element={<OrderScreen/>}/>
              <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
              <Route path="/cart/:productId" element={<CartScreen/>}/>
              <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>}/>
              <Route path="/" element={<HomeScreen/>}/>
              <Route path="/search/:query" element={<SearchBox/>}/>
              <Route path="/admin/userlist" element={<UserListScreen/>}/>
              <Route path="/admin/productlist" element={<ProductListScreen/>}/>
              <Route path="/admin/orderslist" element={<OrderListScreen/>}/>
            </Routes>
          </Container>
        </main>
      <Footer />
    </>
  )
}

export default App
