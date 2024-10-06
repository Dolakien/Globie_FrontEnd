/* eslint-disable default-case */
import { Flex, message, Popconfirm, Table, Tag } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import productApi from "../../../api/productApi";
import { formatPrice } from "../../../utils/formatPrice";

const ProductList = () => {
  const [data, setData] = useState([]);

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = useCallback(async () => {
    try {
      let data = [];

      switch (type) {
        case "selling": {
          const res = await productApi.getAllSellingProduct();
          data = res.data.data;
          break;
        }

        case "processing": {
          const res = await productApi.getAllProcessingProduct();
          data = res.data.data;
          break;
        }

        default: {
          const res = await productApi.getAllProduct();
          data = res.data.data;
        }
      }

      setData(data);
    } catch (error) {
      message.error("Failed to fetch");
    }
  }, [type]);

  const handleDeleteProduct = useCallback(
    async (id) => {
      try {
        await productApi.deleteProduct(id);
        fetchData();
        message.success("Delete successfully");
      } catch (error) {
        message.error("Failed to delete");
      }
    },
    [fetchData]
  );

  const handleUpdateStt = async (id) => {
    try {
      await productApi.updateStatus(id);
      fetchData();
      message.success("Update status successfully");
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  const columns = useMemo(() => {
    const columns = [
      {
        title: "Id",
        key: "productId",
        dataIndex: "productId",
      },
      {
        title: "Name",
        dataIndex: "productName",
        key: "name",
      },
      {
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (price) => {
          return formatPrice(price) + "đ";
        },
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Warranty",
        dataIndex: "warranty",
        key: "warranty",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, row) => {
          return (
            <Flex gap={8} align="center">
              <Popconfirm
                title="Delete product"
                description="Are you sure you want to delete this product?"
                onConfirm={() => handleDeleteProduct(row.productId)}
              >
                <FaRegTrashAlt className="text-base text-red-500 cursor-pointer" />
              </Popconfirm>

              <Popconfirm
                title="Update status"
                description="Are you sure you want to update status of this product?"
                onConfirm={() => handleUpdateStt(row.productId)}
              >
                <FaRegEdit className="text-lg cursor-pointer" />
              </Popconfirm>
            </Flex>
          );
        },
      },
    ];

    if (type === "all") {
      columns.splice(5, 0, {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (stt) => <Tag color="green">{stt}</Tag>,
      });
    }

    return columns;
  }, [handleDeleteProduct, type]);

  const renderTitle = () => {
    switch (type) {
      case "selling": {
        return "Selling Product List";
      }
      case "processing": {
        return "Processing Product List";
      }
      default: {
        return "All Product List";
      }
    }
  };

  return (
    <>
      <h2 className="font-semibold text-2xl mb-4">{renderTitle()}</h2>

      <Table columns={columns} dataSource={data} rowKey="productId" />
    </>
  );
};

export default ProductList;
