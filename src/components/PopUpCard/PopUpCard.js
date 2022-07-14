import styled from "@emotion/styled";
import { X } from "react-feather";
import Modal from "react-modal";

Modal.setAppElement("#root");

const PopUpCard = ({ isOpen, onRequestClose, title, children, ...props }) => {
  const ModalOverlay = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 0px;
    background: rgba(0, 0, 0, 0.75);

    &.ReactModal__Overlay--after-open {
      .ReactModal__Content {
        bottom: 0;
      }
    }

    &.ReactModal__Overlay--before-close {
      .ReactModal__Content {
        bottom: -100%;
      }
    }
  `;

  const ModalContent = styled.div`
    width: 100%;
    max-width: 550px;
    border: none;
    position: absolute;
    bottom: -100%;
    left: 50%;
    transform: translate(-50%, 0);
    transition: all 300ms;
    overflow: auto;
    outline: none;
  `;

  const CardContainer = styled.div`
    position: relative;
    display: block;
    width: 100%;
    background: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 50px 16px 16px;

    @media (min-width: 768px) {
      padding: 66px 32px 32px;
    }
  `;

  const CardHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 16px;
    position: absolute;
    top: 0;
    left: 0;

    @media (min-width: 768px) {
      height: 66px;
    }
  `;

  const CardTitle = styled.span`
    display: block;
    width: calc(100% - 30px);
    font-size: 1.125rem;
    font-weight: bold;
    padding-right: 16px;

    @media (min-width: 768px) {
      padding-right: 32px;
    }
  `;

  const CloseButton = styled.button`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: #eee;
    border: none;
    border-radius: 50%;
    padding: 0 4px;
    margin: 0;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);

    &:hover {
      filter: brightness(90%);
    }

    @media (min-width: 768px) {
      right: 32px;
    }
  `;

  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={300}
      onRequestClose={onRequestClose}
      overlayClassName="ModalOverlay"
      className="Modal"
      contentElement={(props, content) => (
        <ModalContent {...props}>{content}</ModalContent>
      )}
      overlayElement={(props, content) => (
        <ModalOverlay {...props}>{content}</ModalOverlay>
      )}
      {...props}
    >
      <CardContainer>
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          <CloseButton onClick={onRequestClose}>
            <X />
          </CloseButton>
        </CardHeader>
        {children}
      </CardContainer>
    </Modal>
  );
};

export default PopUpCard;
