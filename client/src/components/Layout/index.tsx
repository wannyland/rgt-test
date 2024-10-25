import GlobalNav from "components/Template/Nav";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

// Styled Components 정의
const Container = styled.div`
  display: flex;
  min-height: 500px;
`;

const Layout = () => {
  return (
    <Container>
      <GlobalNav />
      <Outlet />
    </Container>
  );
};

export default Layout;
