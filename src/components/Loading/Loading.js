import styled from "@emotion/styled";
import spinner from "./loading.svg";

const Loading = ({ width, height, center }) => {
  const Element = styled.div`
    ${center &&
    `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `};

    width: 100%;
    
    & > img {
      width: ${width || "100px"};
      height: ${height || "100px"};
      margin: 0 auto;
    }
  `;

  return (
    <Element>
      <img src={spinner} alt="Loading..." />
    </Element>
  );
};

export default Loading;
