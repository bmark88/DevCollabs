"use strict";
exports.__esModule = true;
var react_1 = require("react");
var gatsby_1 = require("gatsby");
var layout_1 = require("../components/layout");
var image_1 = require("../components/image");
// import SEO from "../components/seo"
var IndexPage = function () { return (<layout_1["default"]>
    
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: "300px", marginBottom: "1.45rem" }}>
      <image_1["default"] />
    </div>
    <gatsby_1.Link to="/page-2/">Go to page 2</gatsby_1.Link>
  </layout_1["default"]>); };
exports["default"] = IndexPage;
