import React, { createContext, useState, useEffect } from "react";

// Create context
export const StudentContext = createContext();

const StudentProvider = ({ children }) => {
    const [studentsDatas, setStudentData] = useState(null)
    const [loading,setLoading]=useState(true)
    useEffect(() => {
      const getStudentsData = async () => {
        console.log("Start fetching...");
        setLoading(true);
    
        try {
          // const storedData = localStorage.getItem("studentsData");
          // // console.log("Stored Data:", storedData.length);
          
          // if ( storedData && storedData.length > 0 ) {
          //   console.log("Data from local storage:", JSON.parse(storedData));
          //   setStudentData(JSON.parse(storedData));
          //   return; // Exit function early
          // }
    
          // console.log(import.meta.env.VITE_API_URL);
    
          const res = await fetch(`${import.meta.env.VITE_API_URL}/data`);
          if (!res.ok) throw new Error("Failed to fetch data");
    
          const data = await res.json();
          console.log("Fetched Data:", data);
    
          setStudentData(data);
          localStorage.setItem("studentsData", JSON.stringify(data));
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
    
      getStudentsData();
    }, []);
    

  return (
    <StudentContext.Provider value={{ studentsDatas, loading }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
