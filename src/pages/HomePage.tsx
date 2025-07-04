import Categories from "./Home/Categories"
import Navbar from "../components/Navbar"
import Recommendation from "./Home/Recommendation"

const HomePage = () => {
  return (
    <div>
    <Navbar/>
    <Categories/>
    <Recommendation/>
    </div>
  )
}

export default HomePage