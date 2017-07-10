import React, { Component } from "react";
import _                    from "lodash";
import './animations.css';

import {
  Text,
  Layout,
  Heading,
} from "spectacle";

class AnimalsResult extends Component {

  render() {

    const { users } = this.props;

    const getEmojis = (users) => {
      const usersArray = _.orderBy(
        Object.keys(users).map(id => ({
          ...users[id],
          count: users[id].count || 0
        }))
        , ['count'], ['desc']);

      return usersArray.map((user, index) => (
        <div
          key={index}
          style={{
            padding: "20px",
            textAlign: "center",
            fontSize: "80px",
          }}>
          <div style={{color: "#e74c3c"}}><strong>{_.get(user, 'count')}</strong></div>
          <div>{_.get(user, 'emoji')}</div>
        </div>
      ));
    };

    const animalsNode = users.length !== 0 ? getEmojis(users) : <div>Catching all the animals from the barn...</div>;

    return (
      <div style={{ overflow: "hidden" }}>
        <Heading size={6} caps fit>Pour conclure</Heading>

        <Layout fill>
          <marquee>
            <Layout>{animalsNode}</Layout>
          </marquee>
        </Layout>
      </div>
    )
  }
};

export default AnimalsResult;
