import { Divider, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

interface ArticleCardProps {
  name: string;
  description: string;
  image?: any;
  tag: string;
  link: string;
}

const Title = styled.a`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Container = styled.div`
  min-width: 330px;
`;

const ArticleCard = ({
  name,
  description,
  image,
  tag,
  link,
}: ArticleCardProps) => {
  // put placeholder image in case of invalid image article
  const addDefaultImage = (e: any) => {
    e.target.src =
      "https://www.logistec.com/wp-content/uploads/2017/12/placeholder.png";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      // transition={{ duration: 0.5 }}
    >
      <Container>
        <div>
          {image && (
            <img
              onError={addDefaultImage}
              style={{ maxWidth: "100%" }}
              src={image}
              alt="articleImage"
            />
          )}
        </div>
        <Typography gutterBottom variant="h5">
          <Typography
            fontFamily={"Roboto"}
            fontSize={"0.5em"}
            variant="subtitle1"
            color={"#e3120b"}
          >
            {tag}
          </Typography>
          <Title>
            <a href={link}>{name}</a>
          </Title>
        </Typography>
        <Typography>{description}</Typography>
      </Container>
    </motion.div>
  );
};

export default ArticleCard;
