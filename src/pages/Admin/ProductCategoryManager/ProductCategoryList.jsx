import { message, Popconfirm, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import categoryApi from "../../../api/categoryApi";
import { FaRegTrashAlt } from "react-icons/fa";

const ProductCategoryList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await categoryApi.getAllCategory();
      setData(res.data.data);
    } catch (error) {
      message.error("Failed to fetch");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await categoryApi.deleteCategory(id);
      fetchData();
      message.success("Delete successfully");
    } catch (error) {
      message.error("Failed to delete");
    }
  };

  const columns = [
    {
      title: "Id",
      key: "productCategoryId",
      dataIndex: "productCategoryId",
    },
    {
      title: "Name",
      dataIndex: "categoryName",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
            onConfirm={() => handleDeleteCategory(row.productCategoryId)}
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

      <Table columns={columns} dataSource={data} scroll={{ x: 900 }} />
    </>
  );
};

export default ProductCategoryList;
