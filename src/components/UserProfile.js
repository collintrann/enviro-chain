import React, { useState, useEffect } from "react";
import moment from "moment";
//import { BrowserRouter as Router, Route } from 'react-router-dom'
//import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import Main from "./Main";
import CircularProgress from "@mui/material/CircularProgress";
import { readData } from "../firebaseService";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  // Your theme configuration goes here
  colors: {
    brand: {
      50: "#f9fafb",
      // ... other color shades
    },
  },
  // ... other theme configurations
});

function formatDateTime(isoString) {
  return moment(isoString).format("YYYY-MM-DD HH:mm:ss");
}

export default function UserProfile() {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readData()
      .then((data) => {
        console.log("Reading data.");
        setCompanyData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Main />
      <div>
        <h2>User Profile</h2>
        {companyData ? (
          <div>
            <p>Name: {companyData.name}</p>
            <p>Total Miles: {companyData.totalMiles}</p>
            <p>Number of Trips: {companyData.totalTrips}</p>
            <p>Total Emissions: {companyData.totalEmissions}</p>
            <p>Last updated: {formatDateTime(companyData.mostRecentDate)}</p>
          </div>
        ) : (
          <p>No expense data available.</p>
        )}
      </div>
    </ChakraProvider>
  );
}
