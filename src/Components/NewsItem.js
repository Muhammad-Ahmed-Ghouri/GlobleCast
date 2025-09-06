import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, auther, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span className="visually-hidden">{source}</span>

          <img
            src={
              !imageUrl
                ? "https://image.cnbcfm.com/api/v1/image/108189738-17…879840734-image_24.png?v=1755880274&w=1920&h=1080"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style={{
                left: "87%",
                zIndex: "1",
                overflow: "hidden",
              }}
            >
              {title.slice(0, 10)}...
            </span>
            <p className="card-text">
              {description}...{" "}
              <span className="badge text-bg-success">New</span>
            </p>
            <p className="card-text">
              <small className="text-muted">
                By {auther} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
