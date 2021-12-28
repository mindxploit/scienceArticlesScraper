import { Box, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import * as cheerio from "cheerio";
import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import Link from "next/link";

// server side articles fetch
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const url = "https://www.economist.com/science-and-technology";
  const { data } = await axios(url);

  return {
    props: {
      data,
    },
  };
}

const Tag = styled.a`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

// @ts-ignore
const Home: NextPage = ({ data }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    getArticles();
  }, [data]);

  const getArticles = () => {
    const $ = cheerio.load(data);
    const allArticles: any[] = [];

    $(".teaser").each((i, el) => {
      const title = $(el).find(".teaser__headline").text();
      const description = $(el).find("p").text();
      const tag = $(el).find(".teaser__subheadline").text();
      const image = $(el).find(".teaser__image").find("img").attr("src");
      const articleLink =
        "https://www.economist.com" + $(el).find(".headline-link").attr("href");
      allArticles.push({ title, description, image, articleLink, tag });
    });

    setArticles(allArticles);
    console.log(allArticles);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Science Scraper</title>
        <meta name="description" content="News about science" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Typography
          fontWeight={"bold"}
          gutterBottom
          textAlign={"center"}
          variant="h3"
        >
          Latest science articles
        </Typography>
        <Box mb={3}>
          <Divider variant="middle" />
        </Box>
        {user ? (
          <Grid mb={3} container spacing={5}>
            {articles.map((article, id) => (
              <Grid sm={6} md={4} item key={id}>
                <Box>
                  <ArticleCard
                    name={article.title}
                    description={article.description}
                    image={article.image}
                    tag={article.tag}
                    link={article.articleLink}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography textAlign="center" variant="h5">
            Please,
            <Link href="/register">
              <Tag> sign up </Tag>
            </Link>
            or
            <Link href="/login">
              <Tag> login </Tag>
            </Link>
            to see today articles.
          </Typography>
        )}
      </main>
    </div>
  );
};

export default Home;
