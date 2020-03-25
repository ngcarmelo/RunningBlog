import React from "react";
import { Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";

import "./NavigationFooter.scss";

export default function NavigationFooter() {
  return (
    <Row className="navigation-footer">
      <Col>
        <h3>Navigation</h3>
      </Col>
      <Col md={12}>
        <RenderListLeft />
      </Col>
      <Col md={12}>
        <RenderListRight />
      </Col>
    </Row>
  );
}

function RenderListLeft() {
  return (
    <ul>
      <li>
        <a href="#">
          <Icon type="book" /> Responsive Design
        </a>
      </li>
      <li>
        <a href="#">
          <Icon type="code" /> WebPage layout
        </a>
      </li>
      <li>
        <a href="#">
          <Icon type="database" /> Modern Frameworks
        </a>
      </li>
      <li>
        <a href="#">
          <Icon type="right" /> Privacy Policy
        </a>
      </li>
    </ul>
  );
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <a href="#">
          <Icon type="hdd" /> Creation of APIs
        </a>
      </li>
      <li>
        <a href="#">
          <Icon type="appstore" />
          Javascript
        </a>
      </li>
      <li>
        <a href="#">
          <Icon type="user" /> Portfolio
        </a>
      </li>
      <li>
        <a href="#">
          <Icon type="right" /> Cookies Policy
        </a>
      </li>
    </ul>
  );
}
