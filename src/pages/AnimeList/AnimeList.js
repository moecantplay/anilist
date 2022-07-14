import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import GET_LIST from "./AnimeList.graphql";
import Container from "../../components/Container/Container";
import Row from "../../components/Row/Row";
import RowChild from "../../components/Row/RowChild";
import AnimeCard from "../../components/AnimeCard/AnimeCard";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading/Loading";
import { checkFav, handleFavourites } from "../../util";

const AnimeList = () => {
  const result = localStorage.getItem("COLLECTION_LIST");
  const [pageInfo, setPageInfo] = useState({});
  const [list, setList] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"));

  const perPage = 10;

  const { loading } = useQuery(GET_LIST, {
    variables: { page: page || 1, perPage },
    onCompleted: async (data) => {
      const { Page } = data;
      const anime = Page?.media;

      const result = await checkFav(anime);

      setList(result);
      setMasterData(anime);
      setPageInfo(Page?.pageInfo);
    },
  });

  const handlePagination = (selected) => {
    const selectedPage = selected + 1;
    if (page !== selectedPage) {
      setSearchParams({ page: selectedPage });
    }
  };

  const recheck = async () => {
    const response = await checkFav(masterData);
    setList(response);
  };

  useEffect(() => {
    if (!page) setSearchParams({ page: 1 });
  }, []);

  useEffect(() => {
    if (list && result) recheck();
  }, [result]);

  if (loading) return <Loading center />;

  return (
    <Container>
      <Row>
        {list.map((i) => (
          <RowChild key={i?.id}>
            <AnimeCard
              link={`/detail/${i?.id}`}
              coverImg={i?.coverImage?.large}
              title={i?.title}
              episodes={i?.episodes}
              genres={i?.genres}
              score={i?.meanScore}
              isFav={i?.isFav}
              onFav={async () => {
                const result = await handleFavourites(i);
                if (result) recheck();
              }}
            />
          </RowChild>
        ))}
      </Row>
      {list?.length > 0 && (
        <Pagination
          pageCount={Math.ceil(pageInfo?.total / perPage)}
          currentPage={page - 1}
          onPageChange={handlePagination}
        />
      )}
    </Container>
  );
};

export default AnimeList;
