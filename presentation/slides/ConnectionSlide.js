import React, { Component } from "react";
import _ from "lodash";

import {
  Text
} from "spectacle";

class ConnectionSlide extends Component {
  render() {
    const { stats } = this.props;
    return (
      <div>
        <Text margin="0 0 40px" textColor="white" size={1} fit>
          <strong>{_.get(stats, 'userCount', 0)}</strong> utilisateurs connectés...
        </Text>
        <Text margin="40px 0 0" textColor="white" size={1} fit>
          Connect to : bit.ly/<strong>bestbdx</strong>
        </Text>
      </div>
    )
  }
}

export default ConnectionSlide;
