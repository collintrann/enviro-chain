import React, { useState, useEffect, useRef } from "react";
//import { BrowserRouter as Router, Route } from 'react-router-dom'
//import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import CircularProgress from "@mui/material/CircularProgress";
import { readData } from "../firebaseService";
import moment from "moment";
import { extendTheme } from "@chakra-ui/react";
import { Container } from "@chakra-ui/layout";
import Content from "./Profile/Content";
import { Box } from "@chakra-ui/react";
import Actions from "./Profile/Actions";
import MainNavigation from './MainNavigation';

import {
  Avatar,
  AvatarBadge,
  Badge,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

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

const list = [
  {
    id: 1,
    name: "Company Name",
    value: 0,
    color: "yellow",
  },
  {
    id: 2,
    name: "Total Trips",
    value: 0,
    color: "blue",
  },
  {
    id: 3,
    name: "Total Mileage",
    value: 0,
    color: "cadet",
  },
  {
    id: 4,
    name: "Carbon emissions",
    value: 0,
    color: "yellow",
  },
];
function formatDateTime(isoString) {
  return moment(isoString).format("YYYY-MM-DD HH:mm:ss");
}

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const profileImage = useRef(null);

  const openChooseImage = () => {
    profileImage.current.click();
  };

  const changeProfileImage = (event) => {
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    const selected = event.target.files[0];

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => setUserProfile(reader.result);
      return reader.readAsDataURL(selected);
    }

    onOpen();
  };

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
        <MainNavigation />
        <CircularProgress />
      </div>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Container display={{ base: "block", md: "flex" }} maxW="container.xl">
        <Box
          as="aside"
          flex={1}
          mr={{ base: 0, md: 5 }}
          mb={{ base: 5, md: 0 }}
          bg="white"
          rounded="md"
          borderWidth={1}
          borderColor="brand.light"
          style={{ transform: "translateY(-100px)" }}
        >
          <VStack
            spacing={3}
            py={5}
            borderBottomWidth={1}
            borderColor="brand.light"
          >
            <Avatar
              size="2xl"
              name="Tim Cook"
              cursor="pointer"
              onClick={openChooseImage}
              src={userProfile ? userProfile : "/img/tim-cook.jpg"}
            >
              <AvatarBadge bg="brand.blue" boxSize="1em">
                <svg width="0.4em" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                  />
                </svg>
              </AvatarBadge>
            </Avatar>
            <input
              hidden
              type="file"
              ref={profileImage}
              onChange={changeProfileImage}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Something went wrong</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>File not supported!</Text>
                  <HStack mt={1}>
                    <Text color="brand.cadet" fontSize="sm">
                      Supported types:
                    </Text>
                    <Badge colorScheme="green">PNG</Badge>
                    <Badge colorScheme="green">JPG</Badge>
                    <Badge colorScheme="green">JPEG</Badge>
                  </HStack>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <VStack spacing={1}>
              <Heading as="h3" fontSize="xl" color="brand.dark">
                Tim Cook
              </Heading>
              <Text color="brand.gray" fontSize="sm">
                CEO of Apple
              </Text>
            </VStack>
          </VStack>
          <VStack as="ul" spacing={0} listStyleType="none">
            {list.map((item) => (
              <Box
                key={item.id}
                as="li"
                w="full"
                py={3}
                px={5}
                d="flex"
                alignItems="center"
                justifyContent="space-between"
                borderBottomWidth={1}
                borderColor="brand.light"
              >
                <Text color="brand.dark">{item.name}</Text>
                <Text color={`brand.${item.color}`} fontWeight="bold">
                  {item.value}
                </Text>
              </Box>
            ))}
          </VStack>
          <Actions />
        </Box>
        <Content />
      </Container>
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
