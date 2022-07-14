import styled from "@emotion/styled";
import React from "react";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastStyle = styled.div`
  .toast {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .toast__body {
    min-height: 55px;
    font-size: 0.875rem;
    font-weight: bold;
    background: #fff;
  }

  .toast__container {
    width: calc(100% - 32px);
    max-width: 550px;
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
  }

  .toast__progress {
    position: absolute;
    bottom: 0;
    height: 4px;
    background: linear-gradient(to right, #333, #eee);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .toast__default {
    position: relative;

    .toast__body {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 0 16px;
      border-radius: 8px;
      box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05),
        0px 6px 16px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
      color: #333;
    }
  }

  .toast__default--success {
    .toast__body {
      color: #35bc0b;
    }
    .toast__progress {
      background: #35bc0b;
    }
  }

  .toast__default--error {
    .toast__body {
      color: #e74c3c;
    }
    .toast__progress {
      background: #e74c3c;
    }
  }

  .toast__default--warning {
    .toast__body {
      color: #f1c410;
    }
    .toast__progress {
      background: #f1c410;
    }
  }

  .toast__default--info {
    .toast__body {
      color: #3498da;
    }
    .toast__progress {
      background: #3498da;
    }
  }
`;

const ToastMessage = styled.span`
  vertical-align: middle;
  margin-left: 4px;
`;

const contextClass = {
  success: "toast toast__default toast__default--success",
  error: "toast toast__default toast__default--error",
  warning: "toast toast__default toast__default--warning",
  info: "toast toast__default toast__default--info",
  default: "toast__default",
};

export const ToastWrapper = () => (
  <ToastStyle>
    <ToastContainer
      transition={Slide}
      position="top-center"
      autoClose={3000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover={false}
      closeButton={false}
      className="toast__container"
      toastClassName={({ type }) => contextClass[type]}
      bodyClassName="toast__body"
      progressClassName="toast__progress"
    />
  </ToastStyle>
);

export const RenderToast = ({ message }) => (
  <ToastMessage>{message}</ToastMessage>
);

const Toast = ({ message, toastId, type }) => {
  toast(<RenderToast message={message} />, {
    toastId,
    type,
  });
};

export default Toast;
