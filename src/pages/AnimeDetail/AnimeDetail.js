import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Star } from "react-feather";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import FavouriteIcon from "../../components/FavouriteIcon/FavouriteIcon";
import Loading from "../../components/Loading/Loading";
import { checkExists, handleFavourites } from "../../util";
import GET_DETAIL from "./AnimeDetail.graphql";

const AnimeDetail = () => {
  const result = localStorage.getItem("COLLECTION_LIST");
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [inCollection, setInCollection] = useState({});

  const { loading, error } = useQuery(GET_DETAIL, {
    variables: { id },
    onCompleted: async (data) => {
      const { Media } = data;
      setDetail(Media);
    },
  });

  const checkFav = async () => {
    const result = await checkExists({ id });
    if (result) setInCollection(result);
  };

  const handleFav = async () => {
    const dataFormat = {
      id: parseInt(id),
      title: { english: detail?.title?.english, native: detail?.title?.native },
      episodes: detail?.episodes,
      genres: detail?.genres && [...detail?.genres],
      coverImage: {
        large: detail?.coverImage?.large || detail?.coverImage?.extraLarge,
      },
      meanScore: detail?.meanScore,
    };

    handleFavourites(dataFormat);
  };

  const InfoRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 16px;
  `;

  const InfoChild = styled.div`
    font-size: 0.875rem;

    &:not(:last-child) {
      position: relative;
      padding-right: 10px;
      margin-right: 5px;

      &:after {
        content: "·";
        text-align: center;
        width: 5px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }

    @media (min-width: 992px) {
      font-size: 1rem;
    }
  `;

  const ImageWrap = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    ${!detail?.coverImage?.extraLarge && "background-color: #EEE;"}
    ${(props) => (props.coverImage ? "margin-bottom: 16px" : "")};

    &:before {
      content: "";
      display: block;
      width: 100%;
      padding-top: ${(props) => {
        if (props.coverImage) return "calc((215 / 155) * 100%)";
        if (props.bannerImage) return "calc((400 / 1900) * 100%)";
      }};
    }
    & > img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  `;

  const Grid = styled.div`
    display: grid;
    grid-template-areas:
      "first"
      "second"
      "third"
      "fourth"
      "fifth"
      "sixth";

    @media (min-width: 640px) {
      column-gap: 20px;
      grid-template-rows: auto auto auto 1fr;
      grid-template-columns: 50%;
      grid-template-areas:
        "first second"
        "first third"
        "first fourth"
        "first fifth"
        "sixth sixth";
    }

    @media (min-width: 992px) {
      column-gap: 32px;
      grid-template-rows: auto auto auto auto 1fr;
      grid-template-areas:
        "first second"
        "first third"
        "first fourth"
        "first fifth"
        "first sixth";
    }
  `;

  const GridChild = styled.div`
    &:nth-of-type(1) {
      grid-area: first;
    }
    &:nth-of-type(2) {
      grid-area: second;
    }
    &:nth-of-type(3) {
      grid-area: third;
    }
    &:nth-of-type(4) {
      grid-area: fourth;
    }
    &:nth-of-type(5) {
      grid-area: fifth;
    }
    &:nth-of-type(6) {
      grid-area: sixth;
    }
  `;

  const borderBottom = css`
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding-bottom: 8px;
    margin-bottom: 12px;

    @media (min-width: 992px) {
      padding-bottom: 12px;
    }
  `;

  const RenderHead = () => {
    const { title, format, startDate, endDate, episodes, duration, status } =
      detail;

    const CoverTitle = styled.h2`
      font-size: 1.5rem;
      margin-top: 16px;
      margin-bottom: 8px;

      @media (min-width: 992px) {
        font-size: 2rem;
        margin-top: 24px;
        margin-bottom: 12px;
      }
    `;

    const formatYear = () => {
      if (startDate?.year === endDate?.year) return endDate?.year;
      else return `${startDate?.year}-${endDate?.year}`;
    };
    const formatEpisode = () => {
      if (episodes > 1) return `${episodes} Episodes`;
      else return `${episodes} Episode`;
    };
    const formatDuration = () => {
      if (duration > 60) {
        const hour = Math.floor(duration / 60);
        const minutes = Math.floor(duration % 60);
        return `${hour}h${minutes}m`;
      } else return `${duration}m`;
    };

    return (
      <>
        <CoverTitle>{title?.english || title?.native}</CoverTitle>
        <InfoRow>
          {format && <InfoChild>{format}</InfoChild>}
          {startDate?.year && endDate?.year && (
            <InfoChild>{formatYear()}</InfoChild>
          )}
          {episodes && <InfoChild>{formatEpisode()}</InfoChild>}
          {duration && <InfoChild>{formatDuration()}</InfoChild>}
          {status && <InfoChild>{status}</InfoChild>}
        </InfoRow>
      </>
    );
  };

  const RenderBannerImage = () => {
    const { bannerImage, title } = detail;

    if (!bannerImage) return "";

    return (
      <ImageWrap bannerImage>
        <img
          src={bannerImage || "/no-image.svg"}
          alt={title?.english || title?.native}
          onError={(e) => (e.currentTarget.src = "/no-image.svg")}
        />
      </ImageWrap>
    );
  };

  const RenderCoverImage = () => {
    const { coverImage, title } = detail;

    const imgURL = coverImage?.extraLarge
      ? coverImage?.extraLarge
      : coverImage?.large;

    return (
      <ImageWrap coverImage>
        <img
          src={imgURL || "/no-image.svg"}
          alt={title?.english || title?.native}
          onError={(e) => (e.currentTarget.src = "/no-image.svg")}
        />
      </ImageWrap>
    );
  };

  const RenderInCollection = () => {
    const Layout = styled.div`
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      ${borderBottom};
    `;

    const LayoutChild = styled.div`
      &:nth-of-type(1) {
        width: 40px;
      }
      &:nth-of-type(2) {
        width: calc(100% - 40px);
        padding-left: 16px;
      }

      @media (min-width: 992) {
        &:nth-of-type(1) {
          width: 44px;
        }
        &:nth-of-type(2) {
          width: calc(100% - 44px);
          padding-left: 16px;
        }
      }
    `;

    const FavouriteButton = styled.button`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: #eee;
      border-radius: 50%;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;

      & > svg {
        width: 20px;
        height: 20px;
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
        width: 44px;
        height: 44px;
        top: 16px;
        right: 16px;

        & > svg {
          width: 24px;
          height: 24px;
        }
      }
    `;

    const CollectionLink = styled(Link)`
      font-style: italic;

      &:hover {
        text-decoration: underline;
      }
    `;

    const Text = styled.span`
      font-size: 0.75rem;
    `;

    const exists = Object.keys(inCollection)?.length;

    const renderText = () => {
      if (exists) {
        const tempObj = { ...inCollection };
        const colNames = Object.keys(tempObj);

        return (
          <>
            You have this item on collection(s) named{"  "}
            {colNames?.map((name, index) => (
              <React.Fragment key={name}>
                <CollectionLink to={`/c-detail/${name}`}>{name}</CollectionLink>
                {colNames?.length !== index + 1 ? ", " : ""}
              </React.Fragment>
            ))}
          </>
        );
      }

      return "You have not added this item to any collection.";
    };

    return (
      <Layout>
        <LayoutChild>
          <FavouriteButton onClick={handleFav}>
            <FavouriteIcon active={exists} />
          </FavouriteButton>
        </LayoutChild>
        <LayoutChild>
          <Text>{renderText()}</Text>
        </LayoutChild>
      </Layout>
    );
  };

  const RenderPopularity = () => {
    const { meanScore } = detail;

    const PopularityWrap = styled.div`
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      ${borderBottom};
    `;

    const PopularityIcon = styled.div`
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 25px;
      height: 25px;
      color: #f5cb42;
    `;

    const PopularityValue = styled.span`
      display: block;
      width: calc(100% - 25px);
      padding-left: 6px;

      .score {
        font-weight: bold;
        font-size: 1.125rem;
      }

      .totalscore {
        font-size: 0.75rem;
      }
    `;

    return (
      <PopularityWrap>
        <PopularityIcon>
          <Star />
        </PopularityIcon>
        <PopularityValue>
          <span className="score">{meanScore}</span>
          <span className="totalscore">/100</span>
        </PopularityValue>
      </PopularityWrap>
    );
  };

  const RenderFavourites = () => {
    const { favourites } = detail;

    const Favourites = styled.span`
      display: block;
      width: 100%;
      font-size: 0.875rem;
      ${borderBottom};
    `;

    return (
      favourites && (
        <Favourites>
          {favourites} people added this show into their favourites list
        </Favourites>
      )
    );
  };

  const RenderGenres = () => {
    const { genres } = detail;

    const GenreWrap = styled.div`
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      ${borderBottom};
    `;

    const Genre = styled.span`
      display: block;
      font-size: 0.875rem;
      color: #fff;
      background-color: #333;
      border-radius: 20px;
      padding: 2px 8px;
      margin-top: 4px;
      margin-bottom: 4px;

      &:not(:last-child) {
        margin-right: 4px;
      }
    `;

    return (
      genres?.length > 0 && (
        <GenreWrap>
          {genres?.map((i) => (
            <Genre key={i}>{i}</Genre>
          ))}
        </GenreWrap>
      )
    );
  };

  const RenderDescription = () => {
    const { description } = detail;

    const Description = styled.article`
      ${borderBottom};
      margin-bottom: 0;
    `;

    const sanitized = description?.includes("<br>")
      ? description.split("<br>").join("")
      : description;

    return detail?.description && <Description>{sanitized}</Description>;
  };

  useEffect(() => {
    if (detail) checkFav();
  }, [result]);

  if (loading) return <Loading center />;
  if (error) return error;

  return (
    <Container>
      <RenderBannerImage />
      <RenderHead />

      <Grid>
        <GridChild>
          <RenderCoverImage />
        </GridChild>
        <GridChild>
          <RenderInCollection />
        </GridChild>
        <GridChild>
          <RenderPopularity />
        </GridChild>
        <GridChild>
          <RenderFavourites />
        </GridChild>
        <GridChild>
          <RenderGenres />
        </GridChild>
        <GridChild>
          <RenderDescription />
        </GridChild>
      </Grid>
    </Container>
  );
};

export default AnimeDetail;
