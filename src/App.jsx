import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route,useNavigate,useLocation } from "react-router-dom";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import SalesPage from "./pages/Penjualan";
import InventoryPage from "./pages/StokBarang";
import FinancialReportPage from "./pages/FinancialReport";
import CustomerManagementPage from "./pages/CustomerManagement";
import Staff from "./pages/Staff";
import AnalyticalReportPage from "./pages/AnalyticalReport";
import NotificationsPage from "./pages/Notifications";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Topbar from "./components/Topbar";
const App = () => {
 const navigate=useNavigate()
 const location = useLocation()
 
 useEffect(()=>{
  const session=localStorage.getItem("key")
  if (!session) {
    navigate('/login')
  } else if(session && location.pathname =='/login' ){
   navigate('/')
  }
 },[navigate])
  return (
    
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/financial-report" element={<FinancialReportPage />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/analytical-report" element={<AnalyticalReportPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/customer-management" element={<CustomerManagementPage />} />
        
      </Routes>
    
  );
};

export default App;
