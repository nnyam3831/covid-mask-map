import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;

  padding: 10px;
  height: 8vh;
  background-color: #fab1a0;
`;
const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: white;
`;
export default () => {
  return (
    <Container>
      <Title>Covid Mask Map</Title>
    </Container>
  );
};
