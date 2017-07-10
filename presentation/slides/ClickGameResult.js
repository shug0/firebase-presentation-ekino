import React, { Component } from "react";

import {
  Text,
  Layout
} from "spectacle";

class ClickGameResult extends Component {

  componentWillUnmount() {
    this.props.lockCounter(true)
  }

  render() {
    const { users } = this.props;
    const hasUser = Object.keys(users).length !== 0;

    const getUsersStats = () => {
      const usersArray = _.orderBy(
        Object.keys(users).map(id => ({
          ...users[id],
          count: users[id].count || 0
        }))
        , ['count'], ['desc']);

      return usersArray.map((user, index) => {
        if (index > 2) return null;

        return (
        <div
          key={index}
          style={{
            padding: "20px",
            fontSize: "3rem"
          }}>
          <div>{_.get(user, 'count')}</div>
          <div style={{ fontSize: "80px"}}>{_.get(user, 'emoji')}</div>
          <div style={{
            color: "black",
            fontSize: "0.5em"
          }}>{_.get(user, 'name')}</div>
        </div>
        )
      });
    };

    return (
       <div>
          <Text margin="0 0 40px" caps bold size={1} fill>And the winners are</Text>
         {hasUser &&
            <Layout style={{justifyContent: "center", transform: "scale(1.4)"}}>
              {getUsersStats()}
            </Layout>
         }
         {!hasUser &&
         <Text margin="0 0 40px" size={1}>
           Loading...
         </Text>}
      </div>
    )
  }
}

export default ClickGameResult;
