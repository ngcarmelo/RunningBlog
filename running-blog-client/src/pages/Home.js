import React from "react";
import { Helmet } from "react-helmet";
import MainBanner from "../components/Web/MainBanner";
import { Row, Col } from "antd";

import PostsListWeb from "../components/Web/Blog/PostsListWeb";

export default function Home(props) {
  const { location, history } = props;
  return (
    <>
      <Helmet>
        <title>Carmelo Navarro Garcia</title>
        <meta
          name="description"
          content="Home | Running Web"
          data-react-helmet="true"
        />
      </Helmet>
      <MainBanner />

      <Row>
        <Col md={4} />
        <Col md={16}>
          <PostsListWeb location={location} history={history} />
        </Col>
        <Col md={4} />
      </Row>
    </>
  );
}
