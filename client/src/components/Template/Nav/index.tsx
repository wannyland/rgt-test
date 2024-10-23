import { useRecoilState } from "recoil";
import { globalNavState } from "../../../recoil/atom/nav";
import { Navbar } from "./index.styled";

const GlobalNav = () => {
  const [navOpen, setNavOpen] = useRecoilState(globalNavState);
  return (
    <Navbar.Container navOpen={navOpen}>
      {!navOpen && (
        <Navbar.CollapsedButton onClick={() => setNavOpen(true)}>
          &gt;
        </Navbar.CollapsedButton>
      )}
      {navOpen && (
        <>
          <Navbar.Button onClick={() => setNavOpen(false)}>&lt;</Navbar.Button>
          <Navbar.Menu navOpen={navOpen}>
            <Navbar.Item>도서 관리</Navbar.Item>
          </Navbar.Menu>
        </>
      )}
    </Navbar.Container>
  );
};

export default GlobalNav;