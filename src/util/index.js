import Toast from "../components/Toast/Toast";
import { doCollectionList, doCollectionName } from "./actions";

export const createCollection = async (obj) => {
  const result = await getCollection();
  const collection = JSON.parse(result);

  if (collection) {
    const tempArr = { ...collection };
    const key = Object.keys(obj);
    const exists = tempArr.hasOwnProperty(key);

    if (exists) {
      Toast({ type: "error", message: "Collection name already exists." });
      return false;
    }
  }

  const newArr = JSON.stringify({ ...collection, ...obj });
  localStorage.setItem("COLLECTION_LIST", newArr);
  Toast({ type: "success", message: "Successfully created a collection" });
  return true;
};

export const editCollectionName = async ({ oldName, newName }) => {
  const result = await getCollection();
  const collection = JSON.parse(result);

  const tempObj = { ...collection };

  if (oldName !== newName) {
    Object.defineProperty(
      tempObj,
      newName,
      Object.getOwnPropertyDescriptor(tempObj, oldName)
    );
    delete tempObj[oldName];
  }

  const newData = JSON.stringify(tempObj);
  localStorage.setItem("COLLECTION_LIST", newData);
  Toast({ type: "success", message: "Successfully changed collection name." });
  return true;
};

export const deleteCollection = async (name) => {
  const result = await getCollection();
  const collection = JSON.parse(result);

  const tempObj = { ...collection };
  delete tempObj[name];

  const newData = JSON.stringify(tempObj);
  localStorage.setItem("COLLECTION_LIST", newData);
  Toast({ type: "success", message: "Successfully deleted collection." });
  return true;
};

export const getCollection = async () => {
  const collection = await localStorage.getItem("COLLECTION_LIST");

  if (collection) return collection;
  return false;
};

export const checkExists = async ({ id }) => {
  const result = await getCollection();
  const collection = JSON.parse(result);

  if (collection) {
    const tempCol = { ...collection };
    const objKeys = Object.keys(collection);
    let res = {};

    objKeys.forEach((name) => {
      let obj = {};
      const col = tempCol[name];
      const found = col.find((i) => i?.id === parseInt(id));
      obj[name] = found;

      if (found) res = { ...res, ...obj };
    });

    if (Object.keys(res).length) return res;
    return false;
  }

  return false;
};

export const handleFavourites = async (obj) => {
  const exists = await checkExists({ id: obj?.id });

  if (exists) {
    const result = await getCollection();
    const collection = JSON.parse(result);
    const tempObj = { ...collection };
    const objKeys = Object.keys(tempObj);

    objKeys.forEach((name) => {
      const index = tempObj[name]?.findIndex((i) => i?.id === obj?.id);
      if (index > -1) tempObj[name]?.splice(index, 1);
    });

    const newData = JSON.stringify(tempObj);
    localStorage.setItem("COLLECTION_LIST", newData);
    Toast({ type: "success", message: "Successfully removed item." });
    return true;
  }

  const result = await getCollection(obj);
  const collection = JSON.parse(result);

  if (!collection) {
    doCollectionName({ type: "create-new", data: obj });
    return true;
  }

  if (collection) {
    doCollectionList(obj);
    return true;
  }

  Toast({ type: "error", message: "Failed to add item." });
  return false;
};

export const checkFav = async (arr) => {
  const tempArr = [...arr];
  const result = await getCollection();
  const collection = JSON.parse(result);

  for (let index = 0; index < tempArr.length; index++) {
    tempArr[index].isFav = false;
  }

  if (collection) {
    const tempCol = { ...collection };
    const objKeys = Object.keys(tempCol);

    if (objKeys?.length) {
      objKeys?.forEach((name) => {
        const col = tempCol[name];
        if (col?.length) {
          col?.forEach((x) => {
            const index = tempArr?.findIndex((y) => x?.id === y?.id);
            if (index > -1) tempArr[index].isFav = true;
          });
        }
      });
    }
  }

  return tempArr;
};
