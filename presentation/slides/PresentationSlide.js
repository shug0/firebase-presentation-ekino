import React from "react";

import {
  Heading,
  Text
} from "spectacle";

const PresentationSlide = () => (
  <div>
    <Heading size={1} fit caps lineHeight={1} textColor="secondary">
      🔥 Firebase 🔥
    </Heading>
    <Text margin="10px 0 0" textColor="tertiary" size={1} fit style={{fontWeight: "light"}}>
      Présentation et démo de la suite de Google dans le cloud
    </Text>
  </div>
);

export default PresentationSlide;
