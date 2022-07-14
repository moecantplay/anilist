import styled from "@emotion/styled";
import { ChevronLeft } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const Header = styled.header`
    width: 100%;
    height: 60px;
    color: #fff;
    background-color: #333;
  `;

  const HeaderContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 16px;

    @media (min-width: 992px) {
      max-width: 1024px;
      padding: 0 32px;
      margin: 0 auto;
    }
  `;

  const HeaderButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    ${(props) => (props.right ? "margin-left: auto" : "0")};

    & > svg {
      width: 25px;
      height: 25px;
    }
  `;

  const HeaderTitle = styled.h1`
    line-height: 1;
    font-size: 1.5rem;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  return (
    <Header>
      <HeaderContainer>
        {pathname.length > 1 && (
          <HeaderButton onClick={() => navigate(-1)}>
            <ChevronLeft />
          </HeaderButton>
        )}
        <HeaderTitle>Anime</HeaderTitle>
        <HeaderButton right onClick={() => navigate("/c-list")}>
          <img src="/wishlist.svg" alt="Collection List" />
        </HeaderButton>
      </HeaderContainer>
    </Header>
  );
};

export default Header;
