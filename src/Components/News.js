import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  render() {
    return (
      <>
        <h1>this is news</h1>
        <NewsItem />
      </>
    );
  }
}

export default News;
