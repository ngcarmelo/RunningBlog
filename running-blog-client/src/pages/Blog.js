import React from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import PostsListWeb from "../components/Web/Blog/PostsListWeb";
import PostInfo from "../components/Web/Blog/PostInfo";

export default function Blog(props) {
  const { location, history } = props;
  const { url } = useParams(); //react router dom
  //segun si recibe el parametro url, se nos mostrara  blog  general o la lista de post
  return (
    <Row>
      <Col md={4} />
      <Col md={16}>
        {url ? (
          <PostInfo url={url} />
        ) : (
          <PostsListWeb location={location} history={history} />
        )}
      </Col>
      <Col md={4} />
    </Row>
  );
}
