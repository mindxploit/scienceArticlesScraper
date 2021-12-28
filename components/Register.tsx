import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { auth, createUserWithEmailAndPassword } from "../lib/firebase";

const Container = styled.div`
  background-color: #f5f4ef;
  width: 400px;
  padding: 20px;
  margin: auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const register = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Account created");
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="register" content="register to the platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={register}>
        <Box mt={10}>
          <Typography gutterBottom textAlign={"center"} variant="h5">
            Register
          </Typography>
          <Typography textAlign={"center"} variant="body2">
            Create a new account
          </Typography>
          <Container>
            <Box mb={2}>
              <Typography gutterBottom fontWeight={"bold"}>
                Email
              </Typography>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                id="email"
                type="email"
                size="small"
                variant="outlined"
                required
              />
            </Box>
            <Box mb={3}>
              <Typography gutterBottom fontWeight={"bold"}>
                Password
              </Typography>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                id="password"
                size="small"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                required
              />
            </Box>
            <Button type="submit" variant="outlined">
              Register
            </Button>
          </Container>
        </Box>
      </form>
    </>
  );
};

export default Register;
