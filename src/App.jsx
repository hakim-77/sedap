// import Dashboard from './pages/Dashboard'
// import Orders from './pages/orders'
// import Customers from './pages/Customers'
// import NotFound from './pages/NotFound'
// import ErrorPages400 from './pages/ErrorPages400'
// import ErrorPages401 from './pages/ErrorPages401'
// import ErrorPages403 from './pages/ErrorPages403'
// import InputCustomers from './pages/InputCustomers'
// import InputOrders from './pages/InputOrders'
// import './index.css'
import './assets/tailwind.css'
import { Route, Routes } from "react-router-dom";
// import MainLayout from './layout/MainLayout'
// import AuthLayout from './layout/AuthLayout'
// import Login from './pages/auth/Login.jsx'
// import Forgot from './pages/auth/Forgot.jsx'
// import Register from './pages/auth/Register.jsx'
import React, { Suspense } from 'react'
import Products from './pages/Products';
// import AboutUs from './components/Guest/AboutUs';
// import GuestLayout from './layout/GuestLayout';
// import DashboardGuest from './pages/Guest/DashboardGuest';
// import HeroSection from './components/Guest/HeroSection';
// import Produk from './pages/Guest/Produks';

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Orders = React.lazy(() => import("./pages/Orders"))
const Customers = React.lazy(() => import("./pages/Customers"))
const NotFound = React.lazy(() => import("./pages/NotFound"))
const ErrorPages400 = React.lazy(() => import("./pages/ErrorPages400"))
const ErrorPages401 = React.lazy(() => import("./pages/ErrorPages401"))
const ErrorPages403 = React.lazy(() => import("./pages/ErrorPages403"))
const InputCustomers = React.lazy(() => import("./pages/InputCustomers"))
const InputOrders = React.lazy(() => import("./pages/InputOrders"))
const MainLayout = React.lazy(() => import("./layout/MainLayout"))
const AuthLayout = React.lazy(() => import("./layout/AuthLayout"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Forgot = React.lazy(() => import("./pages/auth//Forgot"))
const Register = React.lazy(() => import("./pages/auth//Register"))
const Loading = React.lazy(() => import("./components/Loading"))
const User = React.lazy(() => import("./pages/User"))
const Produks = React.lazy(() => import("./pages/Guest/Produks"))
const HeroSection = React.lazy(() => import("./components/Guest/HeroSection"))
const DashboardGuest = React.lazy(() => import("./pages/Guest/DashboardGuest"))
const GuestLayout = React.lazy(() => import("./layout/GuestLayout"))
const AboutUs = React.lazy(() => import("./components/Guest/AboutUs"))
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/400" element={<ErrorPages400 />} />
        <Route path="/401" element={<ErrorPages401 />} />
        <Route path="/403" element={<ErrorPages403 />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<MainLayout />}>
          {/* <Route path="/400" element={<ErrorPages400 />} />
          <Route path="/401" element={<ErrorPages401 />} />
          <Route path="/403" element={<ErrorPages403 />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/AddCustomers" element={<InputCustomers />} />
          <Route path="/AddOrders" element={<InputOrders />} />
          <Route path="/User" element={<User />} />
          <Route path="products" element={<Products/>} />
          <Route path="/products/:id" element={<ProductDetail />} /> 
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        <Route element={<GuestLayout />}>
            <Route path="/" element={<DashboardGuest/>} />
            <Route path="/herosection" element={<HeroSection/>} />
            <Route path="/aboutus" element={<AboutUs/>} />
            <Route path="/produks" element={<Produks/>} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
