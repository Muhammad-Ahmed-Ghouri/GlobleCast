import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultPrpos = {
    country: "in",
    pageSize: 5,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  };

  capitilizeFunc = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `GlobleCast - ${this.capitilizeFunc(this.props.category)}`;
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <div className="container">
          <h2 style={{ margin: "40px 0" }}>
            GlobleCast - Top {this.capitilizeFunc(this.props.category)}{" "}
            Headlines
          </h2>
        </div>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((e, index) => (
                <div
                  className="col-md-4"
                  key={`${e.url || e.title || "no-url"}-${index}`}
                >
                  <NewsItem
                    title={e.title ? e.title.slice(0, 45) : ""}
                    description={
                      e.description ? e.description.slice(0, 88) : ""
                    }
                    imageUrl={e.urlToImage}
                    newsUrl={e.url}
                    auther={!e.author ? "Unknown Author" : e.author}
                    date={e.publishedAt}
                    source={e.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-secondary"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page > this.state.totalResults / this.props.pageSize
            }
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
