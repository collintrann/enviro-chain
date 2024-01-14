import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import { processCSV } from './helpers';  // TODO: Import your helper functions
import { writeData } from "./firebaseService";
import "./App.css";
import UserProfile from "./components/UserProfile";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";

function Upload() {
  // const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("File selected:", selectedFile);
    // setFile(selectedFile);
    handleUpload(selectedFile);
  };

  function uploadFile(file, companyName, onUploadProgress) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("company_name", companyName);
    console.log("Uploaded file.");

    return axios.post("http://localhost:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  const handleUpload = async (uploadedFile) => {
    if (!uploadedFile) {
      alert("Please select a file before uploading.");
      return;
    }
    setIsLoading(true);
    setUploadSuccess(false);
    console.log("Handling upload.");

    try {
      const onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
        console.log(`${percentCompleted}% uploaded`);
      };

      const companyName = "Company C";
      const response = await uploadFile(
        uploadedFile,
        companyName,
        onUploadProgress
      );
      if (response.data) {
        await writeData(response.data);
        setUploadSuccess(true);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* File input hidden; triggered by button */}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="fileInput"
        />
        <button onClick={() => document.getElementById("fileInput").click()}>
          Upload Travel Expenses
        </button>
        <Link to="/view-profile">
          <button>My Profile</button>
        </Link>
      </header>
      <Routes>
        <Route path="/view-profile" element={<UserProfile />} />
      </Routes>
      {isLoading && (
        <>
          <CircularProgress />
          <LinearProgress variant="determinate" value={uploadProgress} />
        </>
      )}
      {!isLoading && uploadSuccess && (
        <Alert severity="success">Upload successful!</Alert>
      )}
    </div>
  );
}

export default Upload;

// function App() {
//   // const [file, setFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     console.log("File selected:", selectedFile);
//     // setFile(selectedFile);
//     handleUpload(selectedFile);
//   };

//   function uploadFile(file, companyName, onUploadProgress) {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('company_name', companyName);
//     console.log("Uploaded file.")

//     return axios.post('http://localhost:5000/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       },
//       onUploadProgress
//     });
//   }

//   const handleUpload = async (uploadedFile) => {
//     if (!uploadedFile) {
//       alert("Please select a file before uploading.");
//       return;
//     }
//     setIsLoading(true);
//     setUploadSuccess(false);
//     console.log("Handling upload.")

//     try {
//       const onUploadProgress = (progressEvent) => {
//         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//         setUploadProgress(percentCompleted);
//         console.log(`${percentCompleted}% uploaded`);
//       };

//       const companyName = "Company A";
//       const response = await uploadFile(uploadedFile, companyName, onUploadProgress);
//       if (response.data) {
//         await writeData(response.data);
//         setUploadSuccess(true);
//       }
//     } catch (error) {
//       console.error("Error during file upload:", error);
//     } finally {
//       setIsLoading(false);
//       setUploadProgress(0);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* File input hidden; triggered by button */}
//         <input
//           type="file"
//           accept=".csv"
//           onChange={handleFileChange}
//           style={{ display: 'none' }}
//           id="fileInput"
//         />
//         <button onClick={() => document.getElementById('fileInput').click()}>
//           Upload Travel Expenses
//         </button>
//         <Link to="/view-profile">
//           <button>My Profile</button>
//         </Link>
//       </header>
//       <Routes>
//         <Route path="/view-profile" element={<UserProfile />} />
//       </Routes>
//       {isLoading && (
//         <>
//           <CircularProgress />
//           <LinearProgress variant="determinate" value={uploadProgress} />
//         </>
//       )}
//       {!isLoading && uploadSuccess && (
//         <Alert severity="success">Upload successful!</Alert>
//       )}
//     </div>
//   );
// }

// export default App;
