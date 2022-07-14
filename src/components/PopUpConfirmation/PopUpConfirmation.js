import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { X } from "react-feather";
import Modal from "react-modal";

Modal.setAppElement("#root");

const PopUpConfirmation = ({
  title,
  isOpen,
  onRequestClose,
  onCancel,
  onConfirm,
  ...props
}) => {
  const ModalOverlay = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 0px;
    background: rgba(0, 0, 0, 0.75);
  `;

  const ModalContent = styled.div`
    width: calc(100% - 32px);
    max-width: 550px;
    border: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 300ms;
    overflow: auto;
    outline: none;
  `;

  const CardContainer = styled.div`
    position: relative;
    display: block;
    width: 100%;
    background: #fff;
    border-radius: 20px;
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
      padding: 0 32px;
    }
  `;

  const CardTitle = styled.span`
    display: block;
    font-size: 1.125rem;
    font-weight: bold;
    line-height: 1.5rem;
    margin-bottom: 24px;
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

  const ButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  `;

  const CardButton = css`
    display: block;
    width: calc(50% - 8px);
    height: 35px;
    font-size: 0.875rem;
    color: #fff;
    background: transparent;
    border-radius: 8px;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &:last-child {
      margin-left: auto;
    }

    &:hover {
      filter: brightness(95%);
    }

    @media (min-width: 768px) {
      height: 40px;
      font-size: 1rem;
    }
  `;

  const CancelButton = styled.button`
    ${CardButton};
    background: #e74c3c;
  `;

  const ConfirmButton = styled.button`
    ${CardButton};
    background: #35bc0b;
  `;

  const handleCancel = () => {
    onCancel();
    onRequestClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onRequestClose();
  };

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
          <CloseButton onClick={onRequestClose}>
            <X />
          </CloseButton>
        </CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        <ButtonGroup>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
        </ButtonGroup>
      </CardContainer>
    </Modal>
  );
};

export default PopUpConfirmation;
