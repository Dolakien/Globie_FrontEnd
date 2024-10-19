/* eslint-disable default-case */
import { Flex, message, Popconfirm, Table, Tag, Select } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import accountapi from "../../../api/accountApi";
import dayjs from 'dayjs';
import { FaMale, FaFemale } from 'react-icons/fa'; // Import gender icons from react-icons

const AccountList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Data after filtering
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [role, setRole] = useState(""); // State for selected role

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

      setData(data); // Save original data
      setFilteredData(data); // Initially set filtered data to all data
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

  // Handle role change
  const handleRoleChange = (value) => {
    setRole(value);
    if (value) {
      // Filter data based on selected role
      const filtered = data.filter((account) => account.roleId === value);
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset to original data if no role is selected
    }
  };

  // Map roleId to human-readable roles
  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1:
        return "ADMIN";
      case 2:
        return "STOREKEEPER";
      case 3:
        return "STAFF";
      case 4:
        return "USER";
      default:
        return "UNKNOWN";
    }
  };

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
        render: (sex) => {
          return sex ? (
            <span>
              <FaMale style={{ color: 'blue', marginRight: 4 }} /> Male
            </span>
          ) : (
            <span>
              <FaFemale style={{ color: 'pink', marginRight: 4 }} /> Female
            </span>
          );
        }
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "email",
      },
      {
        title: "Role",
        dataIndex: "roleId",
        key: "roleId",
        render: (roleId) => <Tag>{getRoleName(roleId)}</Tag>, // Display human-readable role name
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
        return "All Account List";
      }
    }
  };

  return (
    <>
      <h2 className="font-semibold text-2xl mb-4">{renderTitle()}</h2>

      <Select
        placeholder="Filter by role"
        onChange={handleRoleChange}
        style={{ width: 200, marginBottom: 20 }}
        allowClear
      >
        <Select.Option value={1}>ADMIN</Select.Option>
        <Select.Option value={2}>STOREKEEPER</Select.Option>
        <Select.Option value={3}>STAFF</Select.Option>
        <Select.Option value={4}>USER</Select.Option>
      </Select>

      <Table columns={columns} dataSource={filteredData} rowKey="accountId" />
    </>
  );
};

export default AccountList;
