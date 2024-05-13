import { Route, Routes } from "react-router-dom"
import LunchPage from "../pages/LunchPage/LunchPage"
import LunchDetail from "../components/LunchDetail/LunchDetail"

function LunchRoute(props) {

  return (
    <div>
      <Routes>
        <Route path="/list" element={<LunchPage />} />
        <Route path='/Detail' element={<LunchDetail />}/>
      </Routes>
    </div>
  )
}



export default LunchRoute

