import React from "react";
import styled from "styled-components";
import { todayUser, todaySet } from "./utils";

const Container = styled.div`
  position: fixed;
  left: 15px;
  bottom: 15px;
  width: 200px;
  height: 200px;
  background-color: black;
  opacity: 0.7;
  border-radius: 15px;
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5px;
  border-bottom: 1px solid gray;
`;
const Title = styled.span`
  font-size: 14px;
  color: white;
  margin-bottom: 5px;
`;
const Subtitle = styled.span`
  font-size: 13px;
  color: white;
  text-align: justify;
  margin-bottom: 5px;
`;
const Info = styled.div`
  padding: 5px;
`;
const List = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  color: white;
  font-weight: 300;
  font-size: 14px;
  margin-top: 5px;
`;
const SubContainer = styled.div`
  margin-top: 5px;
`;
const BoxIcon = styled.div`
  background-color: ${props => props.color};
  width: 13px;
  height: 13px;
  border: 1px solid white;
  border-radius: 1px;
  margin-right: 5px;
`;

export default () => {
  const today = new Date();
  const day = today.getDay();
  const user = todayUser(day);
  const whatToday = todaySet(day);
  return (
    <Container>
      <Header>
        <Title>{`오늘 ${whatToday}요일`}</Title>
        <Subtitle>
          {user === null ? "모두 구매가능" : `~${user[0]}년생, ~${user[1]}년생 구매가능`}
        </Subtitle>
      </Header>
      <Info>
        <Title>마스크 재고</Title>
        <SubContainer>
          <List>
            <BoxIcon color="green" />
            <div>
              <span style={{ marginRight: "10px" }}>많</span>
              <span>100이상</span>
            </div>
          </List>
          <List>
            <BoxIcon color="orange" />
            <div>
              <span style={{ marginRight: "10px" }}>중</span>
              <span>30~100</span>
            </div>
          </List>
          <List>
            <BoxIcon color="red" />
            <div>
              <span style={{ marginRight: "10px" }}>적</span>
              <span>30미만</span>
            </div>
          </List>
          <List>
            <BoxIcon color="white" />
            <div>
              <span style={{ marginRight: "10px" }}>없</span>
              <span>소진됨</span>
            </div>
          </List>
        </SubContainer>
      </Info>
    </Container>
  );
};
