import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { Box } from "@mui/system";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, signInWithEmailAndPassword } from "../lib/firebase";

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

const Login = () => {
  const [user, loading, error] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login success");
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="login" content="login to your account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box mt={10}>
        <Typography gutterBottom textAlign={"center"} variant="h5">
          Log in
        </Typography>
        <Typography textAlign={"center"} variant="body2">
          Welcome back
        </Typography>
        <form disabled={loading} onSubmit={login}>
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
            <Button
              sx={{ marginBottom: 3 }}
              disabled={loading}
              type="submit"
              variant="outlined"
            >
              Login
            </Button>
            <Divider variant="fullWidth" />
            <Stack mt={2} direction="row" justifyContent="center" spacing={2}>
              <Typography>Not registered?</Typography>
              <Typography
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                fontWeight={"bold"}
              >
                <Link href="/register">
                  <a>Register now</a>
                </Link>
              </Typography>
            </Stack>
          </Container>
        </form>
      </Box>
    </>
  );
};

export default Login;
