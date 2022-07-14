import styled from "@emotion/styled";

const RowChild = ({ children }) => {
  const Element = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    padding: 0 8px;
    margin-bottom: 16px;

    @media (min-width: 640px) {
      width: 33.33%;
    }

    @media (min-width: 992px) {
      width: 25%;
      padding: 0 10px;
      margin-bottom: 20px;
    }
  `;

  return <Element>{children}</Element>;
};

export default RowChild;
