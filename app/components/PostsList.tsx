"use client";
import { IPosts } from "../../types/Posts";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { Modal, Form, Input, Table, Button } from "antd";
import { useState, useEffect } from "react";
import { editPost, deletePost } from "@/api";
interface postsListProps {
  posts: IPosts[];
}

const PostsList: React.FC<postsListProps> = ({ posts }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [recordToEdit, setRecordToEdit] = useState<IPosts | null>(null);

  const [form] = Form.useForm();

  const handleEditPost = async (
    values: { title: string; body: string },
    record: IPosts
  ) => {
    try {
      const updatedPost = await editPost({
        id: record.id,
        title: values.title,
        body: values.body,
      });

      console.log("Updated Post:", updatedPost); //to simulate the update process that it warks successfully
      setOpenModalEdit(false);
      setRecordToEdit(null);
      form.resetFields();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (record: IPosts) => {
    try {
      await deletePost(record.id);
      console.log("Post deleted successfully"); //to simulate the delete process that it warks successfully
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const handleEdit = (record: IPosts) => {
    setRecordToEdit(null);
    setRecordToEdit(record);
    setOpenModalEdit(true);
  };
  const handleCancelModal = () => {
    form.resetFields();
    setRecordToEdit(null);
    setOpenModalEdit(false);
  };
  useEffect(() => {}, [setRecordToEdit]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Action",
      key: "action",
      render: (record: IPosts) => (
        <div className="flex gap-4">
          <MdModeEditOutline
            className="text-blue-500"
            cursor="pointer"
            size="20"
            onClick={() => {
              handleEdit(record);
            }}
          />
          <MdDelete
            className="text-red-500"
            cursor="pointer"
            size="20"
            onClick={() => handleDeletePost(record)}
          />
        </div>
      ),
    },
  ];

  // Ensure data is available before calling .map()
  const dataSource =
    posts?.map((item) => ({
      key: item.id, // Ant Design requires a unique "key" prop for each row
      id: item.id,
      title: item.title,
      body: item.body,
    })) || [];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />

      <Modal open={openModalEdit} onCancel={handleCancelModal} footer={null}>
        {recordToEdit && (
          <Form
            form={form}
            initialValues={recordToEdit}
            layout="vertical"
            autoComplete="off"
            onFinish={(values) => {
              handleEditPost(values, recordToEdit); // Pass form values and the record you want to edit
            }}
          >
            <h3 className="text-center font-bold"> Edit post </h3>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please enter a body" },
                { whitespace: true },
                { min: 5 },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Enter title "
                // onChange={(e) => setTitleValue(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Body"
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
                // value={recordToEdit ? recordToEdit.body : ""}
                // onChange={(e) => setBodyValue(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                update
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* <Modal
          open={openModalDelete}
          onCancel={() => setOpenModalDelete(false)}
          onOk={() => {
            setOpenModalDelete(false); // Close the modal
          }}
        >
          <p>Are you sure you want to delete this record?</p>
        </Modal> */}
    </div>
  );
};

export default PostsList;
