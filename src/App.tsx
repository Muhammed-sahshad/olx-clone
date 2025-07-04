import HomePage from "./pages/HomePage"
import SellProduct from "./pages/Profile/SellProduct"
import ProfilePage from './pages/ProfilePage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import ProductView from './components/ProductView'
import { ToastContainer } from "react-toastify"

function App() {

 return(
  <UserProvider>
    <ToastContainer theme="dark" />
  <Router>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/profile/sell" element={<SellProduct/>}/>
      <Route path="/item/:id" element={<ProductView/>}/>
    </Routes>
  </Router>
  </UserProvider>

 )
}

export default App
