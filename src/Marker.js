import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;

const Title = styled.span`
  color: white;
`;
export default () => {
  return (
    <Container>
      <Title>난마커</Title>
    </Container>
  );
};
