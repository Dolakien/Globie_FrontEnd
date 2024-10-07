/* eslint-disable default-case */
import { Flex, message, Popconfirm, Table, Tag } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import accountapi from "../../../api/accountApi";
import dayjs from 'dayjs';

const AccountList = () => {
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
        default: {
          const res = await accountapi.getAllAccount();
          data = res.data.data;
        }
      }

      setData(data);
    } catch (error) {
      message.error("Failed to fetch");
    }
  }, [type]);

  const handleDeleteAccount = useCallback(
    async (username) => {
      try {
        await accountapi.deleteAccount(username);
        fetchData();
        message.success("Delete successfully");
      } catch (error) {
        message.error("Failed to delete");
      }
    },
    [fetchData]
  );

  const columns = useMemo(() => {
    const columns = [
      {
        title: "Id",
        key: "userId",
        dataIndex: "userId",
      },
      {
        title: "Name",
        dataIndex: "userName",
        key: "userName",
      },
      {
        title: "FullName",
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        title: "DoB",
        dataIndex: "dob",
        key: "dob",
        render: (dob) => dayjs(dob).format("DD/MM/YYYY"),  // Định dạng ngày tháng năm
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Sex",
        dataIndex: "sex",
        key: "sex",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "email",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, row) => {
          return (
            <Flex gap={8} align="center">
              <Popconfirm
                title="Delete account"
                description="Are you sure you want to delete this account?"
                onConfirm={() => handleDeleteAccount(row.userName)}
              >
                <FaRegTrashAlt className="text-base text-red-500 cursor-pointer" />
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
  }, [handleDeleteAccount, type]);

  const renderTitle = () => {
    switch (type) {
      default: {
        return "All Product List";
      }
    }
  };

  return (
    <>
      <h2 className="font-semibold text-2xl mb-4">{renderTitle()}</h2>

      <Table columns={columns} dataSource={data} rowKey="accountId" />
    </>
  );
};

export default AccountList;
