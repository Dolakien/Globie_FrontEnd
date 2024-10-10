import { Button, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import categoryApi from "../../../api/categoryApi";
import { useNavigate } from "react-router-dom";

const AddPostCategory = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await categoryApi.addPostCategory(values);
      message.success("Add Post Category Successfully");

      navigate("/admin/postCategories");
    } catch (error) {
      message.error("Failed to add post category");
    }
  };

  return (
    <>
      <h2 className="font-semibold text-2xl mb-4">Add Post Category</h2>

      <Form layout="vertical" onFinish={onSubmit}>
        <FormItem
          label="Name"
          name="categoryName"
          rules={[
            {
              required: true,
              message: "Please enter name",
            },
          ]}
        >
          <Input placeholder="Enter category name" />
        </FormItem>

        <Button type="primary" htmlType="submit" className="mt-3">
        Add Category
        </Button>
      </Form>
    </>
  );
};

export default AddPostCategory;
