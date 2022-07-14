import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import Container from "../../components/Container/Container";
import Loading from "../../components/Loading/Loading";
import PopUpConfirmation from "../../components/PopUpConfirmation/PopUpConfirmation";
import { deleteCollection } from "../../util";
import { doCollectionName } from "../../util/actions";

const CollectionList = () => {
  const result = localStorage.getItem("COLLECTION_LIST");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState({});
  const [popup, setPopup] = useState({ name: "", isOpen: false });

  const Layout = styled.div`
    position: relative;
    height: calc(100vh - 120px);
    max-width: 550px;
    margin: 0 auto;
    overflow-y: auto;
  `;

  const Footer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    padding: 8px 16px;
    position: fixed;
    bottom: 0;
    left: 0;

    button {
      max-width: 550px;
      margin: 0 auto;
    }
  `;

  const fetchData = () => {
    const collection = result && JSON.parse(result);

    if (Object.keys(collection)?.length) setList(collection);
    if (!collection) setList({});

    setLoading(false);
  };

  const handleDelete = async (name) => {
    const result = await deleteCollection(name);
    if (result) {
      const tempObj = { ...list };
      delete tempObj[name];
      setList(tempObj);
    }
  }

  useEffect(() => {
    if (list && result) fetchData();
  }, [result]);

  const renderList = () => {
    const haveList = Object.keys(list)?.length
    if (haveList) {
      const objKeys = Object?.keys(list);
      return objKeys?.map((name) => {
        const item = list[name];
        const episodes =
          item?.length >= 1 && Object.keys(item[0])?.length ? item?.length : 0;

        return (
          <CollectionCard
            key={name}
            name={name}
            imgUrl={item[0]?.coverImage?.large}
            episodes={episodes}
            onClick={() => navigate(`/c-detail/${name}`)}
            onEdit={() =>
              doCollectionName({
                type: "edit",
                data: { [name]: { ...item } },
              })
            }
            onDelete={() => setPopup({ name, isOpen: true })}
          />
        );
      });
    }

    return "You do not have any collection.";
  };

  return (
    <Layout>
      <Container>{!loading ? renderList() : <Loading center />}</Container>
      <Footer>
        <Button onClick={() => doCollectionName({ type: "create-new", data: {} })}>
          Create New Collection
        </Button>
      </Footer>

      <PopUpConfirmation
        title={`Are you sure you want to delete collection ${popup?.name}?`}
        isOpen={popup?.isOpen}
        onRequestClose={() => setPopup({ name: "", isOpen: false })}
        onCancel={() => setPopup({ name: "", isOpen: false })}
        onConfirm={() => handleDelete(popup?.name)}
      />
    </Layout>
  );
};

export default CollectionList;
