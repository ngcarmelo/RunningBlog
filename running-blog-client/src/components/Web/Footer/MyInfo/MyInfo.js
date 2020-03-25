import React from "react";
import LogoWhite from "../../../../assets/img/png/original.png";
import SocialLink from "../../SocialLinks";

import "./MyInfo.scss";

export default function MyInfo() {
  return (
    <div className="my-info">
      <img src={LogoWhite} alt="Carmelo Navarro Garcia" />
      <h4>
        The world of running has been my passion for years and I wanto to show
        you through this blog
      </h4>
      <SocialLink />
    </div>
  );
}
