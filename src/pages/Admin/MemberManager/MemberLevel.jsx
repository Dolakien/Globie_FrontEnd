import { message, Popconfirm, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import categoryApi from "../../../api/categoryApi";
import { FaRegTrashAlt } from "react-icons/fa";

const PostCategoryList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await categoryApi.getAllPostCategory();
      setData(res.data.data);
    } catch (error) {
      message.error("Failed to fetch");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await categoryApi.deletePostCategory(id);
      fetchData();
      message.success("Delete successfully");
    } catch (error) {
      message.error("Failed to delete");
    }
  };

  const columns = [
    {
      title: "Id",
      key: "postCategoryId",
      dataIndex: "postCategoryId",
    },
    {
      title: "Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (stt) => {
        return (
          <Tag color={stt ? "green" : ""}>{stt ? "Active" : "Inactive"}</Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, row) => {
        return (
          <Popconfirm
            title="Delete category"
            description="Are you sure you want to delete this category?"
            onConfirm={() => handleDeleteCategory(row.postCategoryId)}
          >
            <FaRegTrashAlt className="text-base text-red-500 cursor-pointer" />
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <h2 className="font-semibold text-2xl mb-4">Category List</h2>

      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 900 }}
        rowKey="postCategoryId"
      />
    </>
  );
};

export default PostCategoryList;
