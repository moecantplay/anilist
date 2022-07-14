import { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import CollectionCard from "../components/CollectionCard/CollectionCard";
import Loading from "../components/Loading/Loading";
import PopUpCard from "../components/PopUpCard/PopUpCard";
import Toast from "../components/Toast/Toast";
import { getCollection } from "../util";

const PopUpCollectionList = ({
  title,
  isOpen,
  onRequestClose,
  itemData,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState({});
  const [selectedList, setSelectedList] = useState([]);

  const handleClose = () => {
    setSelectedList([]);
    setList([]);
    setLoading(true);
    onRequestClose();
  };

  const fetchData = async () => {
    const result = await getCollection();
    const collection = JSON.parse(result);

    if (collection) setList(collection);

    setLoading(false);
  };

  const handleSelect = (name) => {
    const tempArr = [...selectedList];
    const check = tempArr.indexOf(name);

    if (check > -1) tempArr.splice(check, 1);
    if (check === -1) tempArr.push(name);

    setSelectedList(tempArr);
  };

  const handleAdd = async () => {
    const result = await getCollection();
    const collection = JSON.parse(result);

    const tempObj = { ...collection };
    selectedList.forEach((name) => {
      const check = tempObj[name].indexOf((i) => i?.id === itemData?.id);
      if (check === -1) return tempObj[name].push(itemData);
    });

    const newData = JSON.stringify(tempObj);
    localStorage.setItem("COLLECTION_LIST", newData);
    Toast({
      type: "success",
      message: "Successfully added item to collection(s).",
    });
    handleClose();
  };

  const renderList = () => {
    if (list) {
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
            onClick={() => handleSelect(name)}
            checked={selectedList.indexOf(name) > -1}
            checkable
          />
        );
      });
    }
  };

  return (
    <PopUpCard
      title={title}
      isOpen={isOpen}
      onAfterOpen={() => fetchData()}
      onRequestClose={handleClose}
      {...props}
    >
      {!loading ? renderList() : <Loading center />}
      <Button onClick={handleAdd} disabled={!selectedList?.length}>
        Add to selected collection(s)
      </Button>
    </PopUpCard>
  );
};

export default PopUpCollectionList;
