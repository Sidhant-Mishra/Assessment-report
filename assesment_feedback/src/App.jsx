import Home from './pages/Home'
import { BrowserRouter as Router,Route,Routes, data } from 'react-router-dom'
import StudentDetailPage from './pages/StudentDetailPage.jsx'
import Layout from './Layout'
// import 

function App() {
  // const {studentsDatas,loading}=useContext(StudentContext)
  
  return (
   <>
    <Router> 
      <Routes >
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}/>
        <Route path='/details/:id' element={<StudentDetailPage />}/>
        </Route>
      </Routes>
    </Router>
   </>
    
  )
}

export default App
