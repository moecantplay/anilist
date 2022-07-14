import styled from "@emotion/styled";

const Button = ({ children, ...props }) => {
  const Element = styled.button`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 40px;
    color: #fff;
    background-color: #333;
    border: none;
    border-radius: 8px;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &:hover {
      filter: brightness(125%);
    }

    &:disabled {
      pointer-events: none;
      color: #ababab;
      background-color: #eee;
    }
  `;

  return <Element {...props}>{children}</Element>;
};

export default Button;
