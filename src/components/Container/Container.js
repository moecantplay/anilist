import styled from "@emotion/styled";

const Container = ({ children }) => {
  const Element = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 24px 16px;

    @media (min-width: 992px) {
      max-width: 1024px;
      padding: 32px;
      margin: 0 auto;
    }
  `;

  return <Element>{children}</Element>;
};

export default Container;
