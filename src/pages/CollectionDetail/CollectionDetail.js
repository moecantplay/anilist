import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimeCard from "../../components/AnimeCard/AnimeCard";
import Container from "../../components/Container/Container";
import Loading from "../../components/Loading/Loading";
import PopUpConfirmation from "../../components/PopUpConfirmation/PopUpConfirmation";
import Row from "../../components/Row/Row";
import RowChild from "../../components/Row/RowChild";
import Toast from "../../components/Toast/Toast";
import { getCollection } from "../../util";

const CollectionDetail = () => {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [popup, setPopup] = useState({ name: "", data: {}, isOpen: false });

  const CollectionTitle = styled.h2`
    width: 100%;
    margin-top: 0;
    margin-bottom: 16px;
  `;

  const getList = async () => {
    const result = await localStorage.getItem("COLLECTION_LIST");
    const collection = JSON.parse(result);

    if (!collection) return false;
    if (collection) setList(collection[name]);

    setLoading(false);
  };

  const handleFav = async (data) => {
    const result = await getCollection();
    const collection = JSON.parse(result);

    const tempObj = { ...collection };
    const index = tempObj[name].findIndex((i) => i?.id === data?.id);
    tempObj[name].splice(index, 1);

    const newData = JSON.stringify(tempObj);
    localStorage.setItem("COLLECTION_LIST", newData);
    setList(tempObj[name]);
    Toast({
      type: "success",
      message: "Successfully removed item from collection.",
    });
  };

  const confirmDelete = (data) => {
    const { title } = data;
    const obj = {
      name: title?.english || title?.native,
      data: { ...data },
      isOpen: true,
    };

    setPopup(obj);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Container>
      <CollectionTitle>{name}:</CollectionTitle>
      {!loading ? (
        <>
          {list?.length ? (
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
                    isFav
                    onFav={() => confirmDelete(i)}
                  />
                </RowChild>
              ))}
            </Row>
          ) : (
            "No item yet on this collection."
          )}
        </>
      ) : (
        <Loading center />
      )}

      <PopUpConfirmation
        title={`Are you sure you want to remove item ${popup?.name} from the collection?`}
        isOpen={popup?.isOpen}
        onRequestClose={() => setPopup({ name: "", isOpen: false })}
        onCancel={() => setPopup({ name: "", isOpen: false })}
        onConfirm={() => handleFav(popup?.data)}
      />
    </Container>
  );
};

export default CollectionDetail;
