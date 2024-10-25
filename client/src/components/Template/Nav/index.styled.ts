import { GlobalNav } from "model/common";
import styled from "styled-components";

const Container = styled.div<GlobalNav>`
  width: ${(p) => (p.navOpen ? "250px" : "0")};
  transition: width 0.5s;
  overflow: hidden;
  background-color: #fff;
`;

const CollapsedButton = styled.button`
  width: 50px;
  padding: 10px;
  cursor: pointer;
  position: fixed;
  border: 1px solid;
  background-color: #fff;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  background-color: #fff;
  padding: 10px;
  cursor: pointer;
`;

const Menu = styled.div<GlobalNav>`
  display: ${(p) => (p.navOpen ? "flex" : "none")};
  flex-direction: column;
  padding: 20px;
`;

const Item = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover,
  .active {
    background-color: #f0f0f0;
  }
`;

export const Navbar = {
  Container,
  CollapsedButton,
  Button,
  Menu,
  Item,
};
