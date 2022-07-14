import { EventEmitter } from "events";

const customEvent = new EventEmitter();

export const doCollectionName = (data) => {
  customEvent.emit("collection-name", data);
};

export const onCollectionName = (callback) => {
  customEvent.on("collection-name", callback);
};

export const doCollectionList = (data) => {
  customEvent.emit("collection-list", data);
};

export const onCollectionList = (callback) => {
  customEvent.on("collection-list", callback);
};
