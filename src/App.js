import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastWrapper } from "./components/Toast/Toast";
import Header from "./components/Header/Header";
import AnimeList from "./pages/AnimeList/AnimeList";
import AnimeDetail from "./pages/AnimeDetail/AnimeDetail";
import CollectionList from "./pages/CollectionList/CollectionList";
import CollectionDetail from "./pages/CollectionDetail/CollectionDetail";
import PopUpCollectionName from "./popups/PopUpCollectionName";
import PopUpCollectionList from "./popups/PopUpCollectionList";
import { onCollectionList, onCollectionName } from "./util/actions";

function App() {
  const [collectionName, setCollectionName] = useState(false);
  const [selectCollection, setSelectCollection] = useState(false);
  const [tempObj, setTempObj] = useState({});

  useEffect(() => {
    onCollectionName(({ type, data }) => {
      setTempObj({ type, data });
      setCollectionName({ type, isOpen: true });
    });

    onCollectionList((data) => {
      setTempObj(data);
      setSelectCollection(true);
    });
  }, []);

  return (
    <div className="App">
      <ToastWrapper />
      <Header />
      <Routes>
        <Route path="/" element={<AnimeList />} />
        <Route path="/detail/:id" element={<AnimeDetail />} />
        <Route path="/c-list" element={<CollectionList />} />
        <Route path="/c-detail/:name" element={<CollectionDetail />} />
      </Routes>

      <PopUpCollectionName
        title={
          collectionName?.type === "create-new"
            ? "New Collection"
            : "Edit Collection Name"
        }
        isOpen={collectionName?.isOpen}
        itemData={tempObj}
        onRequestClose={() => {
          setTempObj({});
          setCollectionName(false);
        }}
      />

      <PopUpCollectionList
        title="Select Collection"
        isOpen={selectCollection}
        itemData={tempObj}
        onRequestClose={() => {
          setTempObj({});
          setSelectCollection(false);
        }}
      />
    </div>
  );
}

export default App;
