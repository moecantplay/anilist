import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import PopUpCard from "../components/PopUpCard/PopUpCard";
import { createCollection, editCollectionName } from "../util";
import { useEffect } from "react";

const schema = yup
  .object({
    CollectionName: yup
      .string()
      .required("Collection Name is required.")
      .matches(/^[A-Za-z0-9 ]+$/, "No special characters allowed."),
  })
  .required();

const PopUpCollectionName = ({
  title,
  isOpen,
  onRequestClose,
  itemData,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleClose = () => {
    setValue("CollectionName", "");
    onRequestClose();
  };

  const onSubmit = async (values) => {
    const data = itemData?.data;
    const name = values?.CollectionName;

    if (itemData?.type === "create-new") {
      let tempObj = {};
      tempObj[name] = [];

      if (Object.keys(data)?.length) tempObj[name].push(data);

      const result = await createCollection(tempObj);
      if (result) handleClose();
    }

    if (itemData?.type === "edit") {
      const oldName = Object.keys(data)[0];
      const result = await editCollectionName({ oldName, newName: name });
      if (result) handleClose();
    }
  };

  useEffect(() => {
    if (itemData?.type === "edit") {
      const name = Object.keys(itemData?.data)[0];
      setValue("CollectionName", name);
    }
  }, [itemData]);

  return (
    <PopUpCard
      title={title}
      isOpen={isOpen}
      onAfterOpen={(e) => setFocus("CollectionName")}
      onRequestClose={handleClose}
      {...props}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          autoFocus
          placeholder="Name Your New Collection"
          error={errors?.CollectionName?.message}
          {...register("CollectionName")}
        />
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </form>
    </PopUpCard>
  );
};

export default PopUpCollectionName;
