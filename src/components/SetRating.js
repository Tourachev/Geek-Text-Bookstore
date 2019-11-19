import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/stars.css";

const Star = ({ selected = false, onClick = f => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick}></div>
);

Star.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func
};

export default class SetRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating
    };

    this.change = this.change.bind(this);
  }

  change(rating) {
    this.setState({ rating });
  }

  render() {
    const { totalStars } = this.props;
    const { rating } = this.state;
    return (
      <div className="star-rating">
        {[...Array(totalStars)].map((n, i) => (
          <Star
            key={i}
            selected={i < rating}
            onClick={() => this.change(i + 1)}
          />
        ))}
        <p>
          {rating} of {totalStars} stars
        </p>
      </div>
    );
  }
}

SetRating.propTypes = {
  totalStars: PropTypes.number,
  rating: PropTypes.number
};

SetRating.defaultProps = {
  totalStars: 5,
  rating: 0
};