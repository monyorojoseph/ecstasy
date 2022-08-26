import { BrowserRouter, Routes, Route } from "react-router-dom"
import ResetPassword from "./pages/authentication/ResetPassword"
import Signin from "./pages/authentication/Signin"
import Signup from "./pages/authentication/Signup"
import CartItems from "./pages/cart/CartItems"
import Checkout from "./pages/cart/Checkout"
import NotFound from "./pages/NotFound"
import ItemDetails from "./pages/item/ItemDetails"
import Items from "./pages/item/Items"
import Orders from "./pages/settings/Orders"
import Profile from "./pages/settings/Profile"
import Settings from "./pages/settings/Settings"
import Welcome from "./pages/Welcome"
import Payment from "./pages/settings/Payment"
import Subscriptions from "./pages/settings/Subscriptions"
import Header from "./components/Header"
import { useState } from "react"
import ProtectedRoute from "./ProtectedRoute"

function App() {
  const [open, setOpen] = useState(false)


  return (
    <div className="bg-slate-50 min-h-screen">
      <BrowserRouter>
        <Header setOpen={setOpen} />
        <CartItems open={open} setOpen={setOpen} />
        <Routes>    
          <Route path="/" element={<Welcome />} />
          <Route path="items" element={<Items />} />
          <Route path="item-:slug" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="settings/" element={<ProtectedRoute><Settings /></ProtectedRoute>}>
            <Route index element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="payment" element={<Payment />} />
            <Route path="subscriptions" element={<Subscriptions />} />
          </Route>
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="sign-in" element={<Signin />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
