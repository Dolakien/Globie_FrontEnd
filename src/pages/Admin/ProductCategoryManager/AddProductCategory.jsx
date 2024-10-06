import { Button, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import categoryApi from "../../../api/categoryApi";
import { useNavigate } from "react-router-dom";

const AddProductCategory = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await categoryApi.addCategory(values);
      message.success("Add category successfully");

      navigate("/admin/categories");
    } catch (error) {
      message.error("Failed to add category");
    }
  };

  return (
    <>
      <h2 className="font-semibold text-2xl mb-4">Add Category</h2>

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

        <FormItem
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        >
          <TextArea placeholder="Enter description" />
        </FormItem>

        <Button type="primary" htmlType="submit" className="mt-3">
          Add category
        </Button>
      </Form>
    </>
  );
};

export default AddProductCategory;
