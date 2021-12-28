import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid lightgrey;

  a {
    cursor: pointer;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > * {
    margin-left: 10px;
  }
`;

const Login = styled.a`
  border-left: 1px solid lightgrey;
  padding-left: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const Register = styled.div`
  border-radius: 1rem;
  padding: 0.25rem 1rem;
  background: #1f2e7a;
  cursor: pointer;

  a {
    color: white;
    font-weight: bold;
  }

  &:hover {
    transition: all 0.5s ease-in-out;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  }
`;

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Container>
      <Link href="/">
        <a>home</a>
      </Link>
      {!user ? (
        <Right>
          <Link href="/register">
            <Register>
              <a>Register</a>
            </Register>
          </Link>
          <Link href="/login">
            <Login>Log in</Login>
          </Link>
        </Right>
      ) : (
        <Right>
          <Typography fontWeight={"bold"}>{user.email}</Typography>
          <Typography
            fontWeight={"light"}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              signOut(auth);
              toast("Bye 👋");
            }}
          >
            <a style={{ marginLeft: 5 }}>logout</a>
          </Typography>
        </Right>
      )}
    </Container>
  );
};

export default Navbar;
