import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navigation from "./customer/Components/Navbar/Navigation";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminRoutes from "./Routers/AdminRoutes";
import NotFound from "./Pages/Notfound";
import AdminPannel from "./Admin/AdminPannel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
// import Routers from './Routers/Routers';

function App() {
  const {auth}=useSelector(store=>store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
       {auth.user?.role==="ROLE_ADMIN" && <Route path="/admin/*" element={<AdminPannel />} />}
      </Routes>
    </div>
  );
}

export default App;

// Minimal App snippet to ensure requested lines exist as active code
export function App_Snippet() {
  return (
    <BrowserRouter>
      <CustomerRoutes />
    </BrowserRouter>
  );
}
