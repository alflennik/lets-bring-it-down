import React, { useEffect, useState } from "react";
import moment from "moment";
import styled, { css } from "styled-components";
import withMobileVersion from "./withMobileVersion";

const OutlineCircle = styled.circle`
  transition: opacity 100ms linear;
  opacity: 0;
  pointer-events: all;
  fill: none;
  stroke: white;
  stroke-width: 1;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  ${(props) =>
    props.focused &&
    css`
      opacity: 1;
    `}
`;

const Graph = ({ isMobile, dailyInfectionRates, onFocus }) => {
  const maxDataPoints = 14;

  const paddingLeft = isMobile ? 40 : 60;
  const paddingRight = isMobile ? 10 : 60;
  const dataPointSpaceCount = isMobile ? maxDataPoints : (maxDataPoints - 1) * 2;

  const coordinates = [];
  let highestY = -Infinity;
  let lowestY = Infinity;
  let x = 0;
  for (var i = maxDataPoints - 1; i >= 0; i -= 1) {
    const isFirstCoordinate = i === maxDataPoints - 1;
    const date = moment().subtract(i, "days").format("YYYY-MM-DD");

    const y = dailyInfectionRates[i].value;

    coordinates.push({
      x,
      y: dailyInfectionRates[i].value,
      date,
      isFirstCoordinate,
    });

    x += 1;

    if (highestY === undefined || y > highestY) {
      highestY = y;
    }
    if (lowestY === undefined || y < lowestY) {
      lowestY = y;
    }
  }

  const [focusedIndex, setFocusedIndex] = useState(maxDataPoints - 1)
  const focus = index => {
    onFocus(maxDataPoints - 1 - index)
    setFocusedIndex(index)
  }
  coordinates[focusedIndex].focused = true;

  const dataPointSpace = 100 / dataPointSpaceCount;
  const getX = (offset) => `${offset * dataPointSpace}%`;
  const formatX = ({ isFirstCoordinate, date }) => {
    const today = moment().format("YYYY-MM-DD");
    if (date === today) {
      return "Today";
    }
    if (isFirstCoordinate || isMobile) {
      return "";
    }
    return moment(date).format("MMM D");
  };

  const maxY = highestY + 0.1;
  const goesBelowZero = lowestY < 0;
  const minY = goesBelowZero ? lowestY - 0.1 : 0;
  const midY = (maxY + minY) / 2;
  const formatY = (percentDecimal) => {
    const percent = percentDecimal * 100;
    const roundNumber = Math.round(percent);
    const plus = roundNumber > 0 ? "+" : "";
    return `${plus}${roundNumber}%`;
  };
  const getY = (value) => {
    const offset = (value - minY) / (maxY - minY);
    const flippedAxisPercent = 100 - offset * 100;
    return `${flippedAxisPercent}%`;
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1300px",
        margin: "0 auto",
        height: "20vh",
        minHeight: "100px",
        display: "grid",
        gridTemplateColumns: `${paddingLeft}px calc(100% - ${
          paddingLeft + paddingRight
        }px)`,
        gridTemplateRows: "1fr 30px",
      }}
    >
      <svg style={{ width: "100%", height: "100%" }}>
        <text
          fontSize="12px"
          textAnchor="end"
          x={paddingLeft - 5}
          y="10px"
          fill="white"
        >
          {formatY(maxY)}
        </text>
        <text
          fontSize="12px"
          textAnchor="end"
          x={paddingLeft - 5}
          y="50%"
          fill="white"
          style={{ transform: "translateY(4px)" }}
        >
          {formatY(midY)}
        </text>
        <text
          fontSize="12px"
          textAnchor="end"
          x={paddingLeft - 5}
          y="100%"
          fill="white"
        >
          {formatY(minY)}
        </text>
      </svg>
      <svg style={{ width: "100%", height: "100%" }}>
        <filter id={`blur${isMobile ? 'mobile' : ''}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="Source Graphic" stdDeviation="5" />
        </filter>

        {/* Graph Top Indicator */}
        <line x1="0px" x2="10px" y1="0" y2="0" stroke="white" strokeWidth="1" />
        <line
          x1="0"
          x2="10px"
          y1="0"
          y2="0"
          stroke="white"
          strokeWidth="1"
          style={{ transform: "translate(calc(100% - 10px), 0px)" }}
        />
        <line
          x1="0px"
          x2="10px"
          y1="50%"
          y2="50%"
          stroke="white"
          strokeWidth="1"
        />
        <line
          x1="0"
          x2="10px"
          y1="50%"
          y2="50%"
          stroke="white"
          strokeWidth="1"
          style={{ transform: "translate(calc(100% - 10px), 0px)" }}
        />

        {/* Graph Lines */}
        {coordinates.map((previous, index) => {
          const next = coordinates[index + 1];
          if (!next) {
            return null;
          }
          return (
            <line
              key={previous.date}
              x1={getX(previous.x)}
              x2={getX(next.x)}
              y1={getY(previous.y)}
              y2={getY(next.y)}
              stroke="white"
              strokeWidth="1"
            />
          );
        })}

        {/* Circles */}
        {coordinates.map((coordinate, index) => {
          if (coordinate.isFirstCoordinate) {
            return null
          }
          return (
            <React.Fragment key={coordinate.date}>
              {/* next.focused ? */}
              {/* Normal circle */}
              <circle
                style={{ display: coordinate.focused ? "none" : "inherit" }}
                cx={getX(coordinate.x)}
                cy={getY(coordinate.y)}
                r="2"
                fill="white"
              />

              <g
                style={{
                  transition: "0.3s linear opacity",
                  opacity: coordinate.focused ? "1" : "0",
                }}
              >
                {/* Glowing circle */}
                <circle
                  cx={getX(coordinate.x)}
                  cy={getY(coordinate.y)}
                  r="4"
                  fill="white"
                />
                <circle
                  cx={getX(coordinate.x)}
                  cy={getY(coordinate.y)}
                  r="10"
                  fill="white"
                  filter={`url(#${`blur${isMobile ? 'mobile' : ''}`})`}
                />
              </g>
              {/* Hover outline */}
              <OutlineCircle
                onClick={() => focus(index)}
                focused={coordinate.focused}
                cx={getX(coordinate.x)}
                cy={getY(coordinate.y)}
                r="12"
              />
            </React.Fragment>
          );
        })}

        {goesBelowZero ? (
          <line
            x1="0%"
            x2="100%"
            y1={getY(0)}
            y2={getY(0)}
            stroke="white"
            strokeDasharray="4"
            strokeWidth="1"
          />
        ) : null}

        {/* Bottom Line */}
        <line
          x1="0%"
          x2="100%"
          y1="100%"
          y2="100%"
          stroke="white"
          strokeWidth="1"
        />

        {/* Bottom Line Ticks */}
        {coordinates.map((coordinate) =>
          coordinate.isFirstCoordinate ? null : (
            <line
              key={coordinate.date}
              x1={getX(coordinate.x)}
              x2={getX(coordinate.x)}
              y1="97%"
              y2="100%"
              stroke="white"
              strokeWidth="1"
            />
          )
        )}
      </svg>
      <svg style={{ width: "100%", height: "100%", gridColumnStart: "2" }}>
        {coordinates.map((coordinate) => (
          <text
            key={coordinate.date}
            fontSize="12px"
            textAnchor="middle"
            x={getX(coordinate.x)}
            y="15px"
            fill="white"
          >
            {formatX(coordinate)}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default withMobileVersion(Graph);
