import React from "react";
import PropTypes from 'prop-types'
import styled from "styled-components";

const Svg = styled.svg`
  fill: ${props => props.color};
  width: ${props => props.size};
  transform: rotate(${(props) => (props.flipped ? "180" : "0")}deg);
`;

const Arrow = ({ size, color, direction }) => {
  return (
    <Svg
      size={size}
      color={color}
      flipped={direction === "down"}
      viewBox="0 0 448 512"
    >
      <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z" />
    </Svg>
  );
};

Arrow.propTypes = {
  direction: PropTypes.oneOf(["up", "down"]).isRequired,
};

export default Arrow