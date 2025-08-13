import React, { useContext } from 'react'
import StudentDashboard from '../components/StudentCard'
import { StudentContext } from '../context/Context.jsx'

function Home() {
  const {studentsDatas, loading } = useContext(StudentContext);
  return (
    <div>
      <StudentDashboard students={studentsDatas}/>
    </div>
  )
}

export default Home
