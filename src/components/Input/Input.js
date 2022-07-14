import styled from "@emotion/styled";
import { forwardRef } from "react";

const Element = styled.div`
  margin-bottom: 16px;
`;

const InputField = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  border: 1px solid #eee;
  padding: 0 16px;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Error = styled.span`
  display: block;
  color: #ff3000;
  font-size: 0.75rem;
`;

const Input = forwardRef(
  ({ type, placeholder, value, onChange, onBlur, error, ...props }, ref) => {
    return (
      <Element>
        <InputField
          ref={ref}
          type={type || "text"}
          value={value}
          placeholder={placeholder || "Text Goes Here"}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
        {error && <Error>{error}</Error>}
      </Element>
    );
  }
);

export default Input;
