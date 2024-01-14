import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Image } from "react";
import Login, { Render } from "react-login-page";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Logo from "react-login-page/logo";
import { FIREBASE_AUTH } from "../Firebase.Config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import logoImage from "./envirochain.png";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const auth = FIREBASE_AUTH;

  const { control } = useForm();
  const navigate = useNavigate();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      if (response) {
        navigate("/upload");
      }
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
      console.log("Signed in.");
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      const userId = response.user.uid;
      console.log("User registered with Firestore");
      if (response) {
        navigate("/upload");
      }
    } catch (error) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    logo: {
      fontWeight: "bold",
      fontSize: "50px",
      color: "#4CAF50",
      marginTop: "30px",
    },
    logoImage: {
      width: "150px",
      height: "150px",
      marginBottom: "0px",
    },
    title: {
      fontSize: "30px",
      fontWeight: "bold",
      color: "#4CAF50",
      marginBottom: "15px",
    },
    label: {
      fontSize: "16px",
      color: "#4CAF50",
      marginBottom: "10px",
    },
    input: {
      height: "40px",
      borderColor: "gray",
      borderWidth: "1px",
      marginBottom: "20px",
      paddingHorizontal: "10px",
      width: "100%",
      maxWidth: "400px",
    },
    button: {
      color: "white",
      backgroundColor: "#4CAF50",
      border: "none",
      borderRadius: "4px",
      padding: "10px 20px",
      marginBottom: "10px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>EnviroChain</h1>
      <img src={logoImage} alt="EnviroChain Logo" style={styles.logoImage} />
      <h2 style={styles.title}>Sign-In</h2>

      <label style={styles.label}>Email</label>
      <input
        type="email"
        style={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label style={styles.label}>Password</label>
      <input
        type="password"
        style={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signIn} style={styles.button}>
        Login
      </button>
      <button onClick={signUp} style={styles.button}>
        Create account
      </button>
    </div>
  );
};

export default Home;
