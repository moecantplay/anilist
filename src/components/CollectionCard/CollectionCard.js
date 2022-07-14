import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { CheckCircle, Edit, Trash2 } from "react-feather";

const CollectionCard = ({
  imgUrl,
  name,
  episodes,
  onClick = () => {},
  onEdit,
  onDelete,
  checkable,
  checked,
}) => {
  const CardContainer = styled.div`
    width: 100%;
    &:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
  `;

  const CardWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `;

  const CardImage = styled.div`
    position: relative;
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 12px;

    & > img {
      object-fit: cover;
    }
  `;

  const CardText = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 60px);
    height: 100%;
    padding-left: 16px;
  `;

  const CardTitle = styled.span`
    display: block;
    font-weight: bold;
    margin-bottom: 4px;
  `;

  const CardInfo = styled.span`
    display: block;
    font-size: 0.75rem;
  `;

  const CardClick = styled.button`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;

    & img {
      transition: all 150ms;
    }

    &:hover {
      & img {
        transform: scale(1.2);
      }
    }

    &:not(:last-child) {
      padding-right: 35px;
    }
  `;

  const CardOptions = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 35px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  `;

  const OptionButton = css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #eee;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      filter: brightness(95%);
    }

    &:not(:only-child) {
      height: 50%;
    }
  `;

  const CardEdit = styled.button`
    ${OptionButton};
    color: #333;
  `;

  const CardDelete = styled.button`
    ${OptionButton};
    color: #ff3000;
  `;

  const CardCheckbox = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #35bc0b;

    svg {
      width: 20px;
      height: 20px;
    }
  `;

  return (
    <CardContainer>
      <CardWrap>
        <CardClick onClick={onClick}>
          <CardImage>
            <img
              src={imgUrl || "/no-image.svg"}
              alt={name}
              onError={(e) => (e.currentTarget.src = "/no-image.svg")}
            />
          </CardImage>
          <CardText>
            <CardTitle>{name}</CardTitle>
            <CardInfo>
              {episodes > 0
                ? `${episodes} Episode${episodes > 1 ? "s" : ""}`
                : "No Episodes"}
            </CardInfo>
          </CardText>
        </CardClick>

        {(onEdit || onDelete) && (
          <CardOptions>
            {onEdit && (
              <CardEdit onClick={onEdit}>
                <Edit />
              </CardEdit>
            )}
            {onDelete && (
              <CardDelete onClick={onDelete}>
                <Trash2 />
              </CardDelete>
            )}
          </CardOptions>
        )}

        {checkable && (
          <CardOptions>
            {checked && (
              <CardCheckbox>
                <CheckCircle />
              </CardCheckbox>
            )}
          </CardOptions>
        )}
      </CardWrap>
    </CardContainer>
  );
};

export default CollectionCard;
