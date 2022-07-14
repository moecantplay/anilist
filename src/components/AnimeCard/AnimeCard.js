import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";

const AnimeCard = ({
  title,
  coverImg,
  score,
  episodes,
  genres,
  link,
  onFav,
  isFav,
}) => {
  const Card = styled.div`
    position: relative;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  `;

  const ImgWrap = styled.div`
    ${!coverImg && "background-color: #EEE;"}
    position: relative;
    overflow: hidden;
    &:before {
      content: "";
      display: block;
      width: 100%;
      padding-top: calc((215 / 155) * 100%);
    }
    & > img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  `;

  const TextWrap = styled.div`
    padding: 8px;

    @media (min-width: 992px) {
      padding: 16px;
    }
  `;

  const Title = styled.div`
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 8px;

    @media (min-width: 992px) {
      font-size: 1.125rem;
      margin-bottom: 12px;
    }
  `;

  const Score = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: #f5cb42;
    border-radius: 50%;
    position: absolute;
    top: 8px;
    left: 8px;

    @media (min-width: 992px) {
      width: 38px;
      height: 38px;
      font-size: 1rem;
      top: 16px;
      left: 16px;
    }
  `;

  const Info = css`
    display: inline-block;
    font-size: 0.75rem;
    color: #fff;
    border-radius: 20px;
    padding: 2px 8px;
  `;

  const Episode = styled.div`
    ${Info}
    background-color: rgba(49, 53, 59, 0.7);
    position: absolute;
    bottom: 8px;
    right: 8px;

    @media (min-width: 992px) {
      font-size: 0.875rem;
      bottom: 16px;
      right: 16px;
    }
  `;

  const Genres = styled.div`
    display: flex;
    flex-wrap: wrap;
  `;

  const Genre = styled.div`
    ${Info}
    background-color: #333;
    margin-bottom: 4px;
    &:not(:last-child) {
      margin-right: 4px;
    }

    @media (min-width: 992px) {
      margin-bottom: 6px;
      &:not(:last-child) {
        margin-right: 6px;
      }
    }
  `;

  const FavouriteButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 50%;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;

    & > svg {
      width: 16px;
      height: 16px;
    }

    &:disabled {
      pointer-events: none;
    }

    &:hover {
      & > svg {
        transform: scale(1.2);
      }
    }

    @media (min-width: 992px) {
      width: 38px;
      height: 38px;
      top: 16px;
      right: 16px;

      & > svg {
        width: 24px;
        height: 24px;
      }
    }
  `;

  const CardLink = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
  `;

  return (
    <Card>
      <FavouriteButton onClick={onFav}>
        <FavouriteIcon active={isFav} />
      </FavouriteButton>

      <CardLink to={link}>
        <ImgWrap>
          <img
            src={coverImg || "/no-image.svg"}
            alt={title?.english || title?.native}
            onError={(e) => (e.currentTarget.src = "/no-image.svg")}
          />
          <Score title="Score">{score}</Score>
          {episodes && (
            <Episode>
              {episodes} {parseInt(episodes) > 1 ? "Episodes" : "Episode"}
            </Episode>
          )}
        </ImgWrap>
        <TextWrap>
          <Title title={title?.english || title?.native}>
            {title?.english || title?.native}
          </Title>
          {genres?.length > 0 && (
            <Genres>
              {genres?.map((i) => (
                <Genre key={i}>{i}</Genre>
              ))}
            </Genres>
          )}
        </TextWrap>
      </CardLink>
    </Card>
  );
};

export default AnimeCard;
