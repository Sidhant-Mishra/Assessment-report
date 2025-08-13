async function processResponseData(data) {
    try {
    //   console.log("Raw Data:", data); // Debugging
  
      if (typeof data === "string") {
        data = data.trim(); // Remove any unexpected whitespace or newlines
        data = data.replace(/```json|```/g, ""); 
    }
  
      const studentData = JSON.parse(data);
    //   console.log("Parsed Data:", studentData);
      
      return studentData;
    } catch (error) {
      console.error("Error parsing student data:", error.message);
      return null;
    }
  }

  export { processResponseData };