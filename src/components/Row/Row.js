import styled from "@emotion/styled";

const Row = ({ children }) => {
  const Element = styled.div`
    display: flex;
    flex-wrap: wrap;
    min-width: 100%;
    margin: 0 -8px;

    @media (min-width: 992px) {
      margin: 0 -10px;
    }
  `;

  return <Element>{children}</Element>;
};

export default Row;
