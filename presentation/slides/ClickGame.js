import React, { Component } from "react";

import {
  Text,
  Layout
} from "spectacle";

class ClickGame extends Component {

  componentDidMount() {
    this.props.lockCounter(true)
  }

  componentWillUnmount() {
    this.props.lockCounter(false)
  }

  render() {
    const { users } = this.props;
    const hasUser = Object.keys(users).length !== 0;

    const getUsersStats = () => {
      let sortedUsers = _.orderBy(
        Object.keys(users).map(id => users[id])
        , ['count'], ['desc']);

      return sortedUsers.map((user, index) => {
        if (!(_.has(user, 'count'))) return null;
        if (index > 5) return null;

        return (
        <div
          key={index}
          className="animated infinite pulse"
          style={{
            padding: "30px",
            fontSize: `${2 - (index /10)}em`,
            animationDelay: `${index * 0.1}s`
          }}>
          <div style={{color: "black"}}>{_.get(user, 'count')}</div>
          <div>{_.get(user, 'emoji')}</div>
        </div>
        )
      });
    };

    return (
       <div>
          <Text margin="0 0 40px" size={1}>SUPER CLICK CHALLENGE</Text>
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

export default ClickGame;
