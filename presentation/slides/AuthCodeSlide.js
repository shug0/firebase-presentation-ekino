import React, { Component } from "react";
import CodeSlide from 'spectacle-code-slide';

class AuthCodeSlide extends Component {
  render() {
    return (
      <CodeSlide
        transition={[]}
        lang="js"
        scale="1.2"
        code={require("raw-loader!../../assets/codes/auth.example")}
        ranges={[
          { loc: [0, 0], title: "Setting up Firebase" },
          { loc: [2, 3] },
          { loc: [5, 7] },
          { loc: [21, 26], title: "Handling Auth" },
          { loc: [22, 23], note: "Anonymous auth"},
          { loc: [23, 24] },
          { loc: [24, 25] },
          { loc: [27, 38], note: "Using Github as provider"},
          { loc: [28, 29]},
          { loc: [7, 8]},
          { loc: [28, 29]},
          { loc: [29, 34]},
          { loc: [34, 37]},
        ]}
      />
    )
  }
}

export default AuthCodeSlide;
