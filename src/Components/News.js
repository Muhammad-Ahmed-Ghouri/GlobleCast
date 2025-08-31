import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=25d3720cdbed454f846d6a6638ba7cbd&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handlePrevClick = async () => {
    console.log("prev");
    let pageNumber = this.state.page - 1;

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=25d3720cdbed454f846d6a6638ba7cbd&page=${pageNumber}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: pageNumber,
      articles: parsedData.articles,
    });
  };

  handleNextClick = async () => {
    console.log("next");
    let pageNumber = this.state.page + 1;

    if (Math.ceil(pageNumber > this.state.totalResults / 20)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=25d3720cdbed454f846d6a6638ba7cbd&page=${pageNumber}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: pageNumber,
        articles: parsedData.articles,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2>GlobleCast - Top Headlines</h2>

        <div className="row">
          {this.state.articles.map((e) => {
            return (
              <div className="col-md-4" key={e.url}>
                <NewsItem
                  title={e.title ? e.title.slice(0, 45) : ""}
                  description={e.description ? e.description.slice(0, 88) : ""}
                  imageUrl={e.urlToImage}
                  newsUrl={e.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-secondary"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
