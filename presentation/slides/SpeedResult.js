import React, { Component } from "react";
import _                    from "lodash";

import {
  Text,
  Layout,
  Heading,
} from "spectacle";

class SpeedResult extends Component {

  render() {

    const { users } = this.props;

    return (
      <div>
        <Heading size={6} caps fit>Quelques informations</Heading>

        <Layout fill>
          <Text size={5} padding="40px">
            <Text padding="0 0 40px" textColor="tertiary">Le plus rapide :</Text>
            <Text
              style={{animationDelay: "1s"}}
              className="animated bounce"
              textSize="120px">{(_.get(users[Object.keys(users)[Object.keys(users).length-1]], 'emoji', '...') + " ")}</Text>
            <Text>{_.get(users[Object.keys(users)[Object.keys(users).length-1]], 'name', '...')}</Text>
          </Text>
          <Text size={5} padding="40px">
            <Text padding="0 0 40px" textColor="tertiary">Le plus lent :</Text>
            <Text
              style={{animationDelay: "3s"}}
              className="animated swing"
              textSize="120px">{(_.get(users[Object.keys(users)[0]], 'emoji', '...') + " ")}</Text>
            <Text>{_.get(users[Object.keys(users)[0]], 'name', '...')}</Text>
          </Text>
        </Layout>
      </div>
    )
  }
};

export default SpeedResult;
