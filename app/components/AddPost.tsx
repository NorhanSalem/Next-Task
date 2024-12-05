"use client";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import ModalComponent from "./Modal";
import { useState } from "react";

const AddPost = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
        color="primary"
        variant="filled"
      >
        Create <FaPlus size={15} />
      </Button>
      <ModalComponent
        modalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></ModalComponent>
    </div>
  );
};

export default AddPost;
