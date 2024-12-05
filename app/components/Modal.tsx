"use client";
import { Modal, Form, Input, Button } from "antd";
import { useState } from "react";
import { AddPost } from "@/api";
interface modalOpenProp {
  modalOpen: boolean;
  setIsModalOpen: (open: boolean) => boolean | void;
}
const ModalComponent: React.FC<modalOpenProp> = ({
  modalOpen,
  setIsModalOpen,
}) => {
  const [newTitlePostValue, setNewTitlePostValue] = useState<string>("");
  const [newBodyPostValue, setNewBodyPostValue] = useState<string>("");

  const [form] = Form.useForm();

  const handleAddPost = async (values: {
    id: number;
    title: string;
    body: string;
  }) => {
    console.log(values);
    try {
      const createdPost = await AddPost({
        id: values.id,
        title: values.title,
        body: values.body,
      });
      console.log("Created Post:", createdPost); //to simulate the post process that it warks successfully
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  return (
    <div>
      <Modal
        open={modalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={handleAddPost}
        >
          <h3 className="text-center font-bold">Add new post </h3>
          <Form.Item
            label="title"
            name="title"
            rules={[
              { required: true, message: "Please enter a title" },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input
              placeholder="Enter title "
              value={newTitlePostValue}
              onChange={(e) => setNewTitlePostValue(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="body"
            name="body"
            rules={[
              { required: true, message: "Please enter a body" },
              { whitespace: true },
              { min: 5 },
            ]}
            hasFeedback
          >
            <Input
              placeholder="Enter body"
              value={newBodyPostValue}
              onChange={(e) => setNewBodyPostValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalComponent;
