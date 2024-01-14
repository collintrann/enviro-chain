import React, { useState, useEffect, useRef } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import CircularProgress from "@mui/material/CircularProgress";
import { readData } from "../firebaseService";
import moment from "moment";
import { Container } from "@chakra-ui/layout";
import Content from "./Profile/Content";
import { Box } from "@chakra-ui/react";
import Actions from "./Profile/Actions";
import MainNavigation from './MainNavigation';
import {
  Avatar,
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
import AmazonLogo from './AmazonLogo.png';

function formatDateTime(isoString) {
  return moment(isoString).format("YYYY-MM-DD HH:mm:ss");
}

const styles = {
  logo: {
    fontWeight: "bold",
    fontSize: "10px",
    color: "#4CAF50",
    marginTop: "10px",
    alignItems: "center",
  },
  logoImage: {
    width: "150px",
    height: "150px",
    marginBottom: "0px",
    margin: "auto", // Center horizontally
    display: "block", // Center horizontally
    alignItems: "center",
  },
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
      <div><MainNavigation /></div>>
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

  const list = [
    {
      id: 2,
      name: "Total Trips",
      value: companyData.totalTrips + " trips",
      color: "blue",
    },
    {
      id: 3,
      name: "Total Mileage",
      value: companyData.totalMiles + " miles",
      color: "cadet",
    },
    {
      id: 4,
      name: "Carbon emissions",
      value: companyData.totalEmissions + " pounds",
      color: "yellow",
    },
    {
      id: 4,
      name: "Last updated: " + formatDateTime(companyData.mostRecentDate),
    },
  ];

  return (
    <ChakraProvider>
      <MainNavigation />
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
          style={{ transform: "translateY(100px)" }}
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
              src={AmazonLogo} alt="Amazon Logo" style={styles.logoImage}
            >
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
                Amazon.com, Inc.
              </Heading>
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
    </ChakraProvider>
  );
}
