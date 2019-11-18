import React, { Component } from "react";
import { Rating } from "semantic-ui-react";

export default class star extends Component {
  render() {
    return (
      <div>
        <Rating maxRating={5} defaultRating={3} icon="star" />
      </div>
      //   <div class="ui star rating" role="radiogroup" tabindex="-1">
      //     <i
      //       tabindex="0"
      //       aria-checked="false"
      //       aria-posinset="1"
      //       aria-setsize="5"
      //       class="active icon"
      //       role="radio"
      //     ></i>
      //     <i
      //       tabindex="0"
      //       aria-checked="false"
      //       aria-posinset="2"
      //       aria-setsize="5"
      //       class="active icon"
      //       role="radio"
      //     ></i>
      //     <i
      //       tabindex="0"
      //       aria-checked="true"
      //       aria-posinset="3"
      //       aria-setsize="5"
      //       class="active icon"
      //       role="radio"
      //     ></i>
      //     <i
      //       tabindex="0"
      //       aria-checked="false"
      //       aria-posinset="4"
      //       aria-setsize="5"
      //       class="icon"
      //       role="radio"
      //     ></i>
      //     <i
      //       tabindex="0"
      //       aria-checked="false"
      //       aria-posinset="5"
      //       aria-setsize="5"
      //       class="icon"
      //       role="radio"
      //     ></i>
      //   </div>
    );
  }
}
