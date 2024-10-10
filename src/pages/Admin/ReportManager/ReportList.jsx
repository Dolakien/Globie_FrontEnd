/* eslint-disable default-case */
import { Flex, message, Popconfirm, Table, Tag } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import reportApi from "../../../api/reportApi";
import { Dropdown, Menu} from 'antd'; // Make sure these are imported

const ReportList = () => {
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
        case "approved": {
          const res = await reportApi.getAllReportApproved();
          data = res.data.data;
          break;
        }

        case "processing": {
          const res = await reportApi.getAllReportProccessing();
          data = res.data.data;
          break;
        }

        case "rejected": {
            const res = await reportApi.getAllReportRejected();
            data = res.data.data;
            break;
          }

        default: {
          const res = await reportApi.getAllReport();
          data = res.data.data;
        }
      }

      setData(data);
    } catch (error) {
      message.error("Failed to fetch");
    }
  }, [type]);

  const handleDeleteReport = useCallback(
    async (id) => {
      try {
        await reportApi.deleteReport(id);
        fetchData();
        message.success("Delete successfully");
      } catch (error) {
        message.error("Failed to delete");
      }
    },
    [fetchData]
  );

  const handleUpdateSttApproved = async (id) => {
    try {
      await reportApi.updateReportApproved(id);
      fetchData();
      message.success("Update status successfully");
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  const handleUpdateSttRejected = async (id) => {
    try {
      await reportApi.updateReportRejected(id);
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
        key: "reportId",
        dataIndex: "reportId",
      },
      {
        title: "Message",
        dataIndex: "message",
        key: "message",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Created-Time",
        dataIndex: "createdTime",
        key: "createdTime",
      },
      {
        title: "UpdatedTime",
        dataIndex: "updatedTime",
        key: "updatedTime",
      },
      {
        title: "productId",
        dataIndex: "productId",
        key: "productId",
      },
      {
        title: "userId",
        dataIndex: "userId",
        key: "userId",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, row) => {
          // Dropdown Menu for Approve and Reject options
          const menu = (
            <Menu>
              <Menu.Item key="approve" onClick={() => handleUpdateSttApproved(row.reportId)}>
                Approve
              </Menu.Item>
              <Menu.Item key="reject" onClick={() => handleUpdateSttRejected(row.reportId)}>
                Reject
              </Menu.Item>
            </Menu>
          );

          return (
            <Flex gap={8} align="center">
              <Popconfirm
                title="Delete report"
                description="Are you sure you want to delete this report?"
                onConfirm={() => handleDeleteReport(row.reportId)}
              >
                <FaRegTrashAlt className="text-base text-red-500 cursor-pointer" />
              </Popconfirm>
              {
                type === "processing" && (
                  // Dropdown with Approve and Reject options
                  <Dropdown overlay={menu} trigger={['click']}>
                    <FaRegEdit className="text-lg cursor-pointer" onClick={(e) => e.preventDefault()} />
                  </Dropdown>
                )
              }
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
  }, [handleDeleteReport, type]);

  const renderTitle = () => {
    switch (type) {
      case "approved": {
        return "Approved Report List";
      }
      case "processing": {
        return "Processing Report List";
      }
      case "rejected": {
        return "Rejected Report List";
      }
      default: {
        return "All Report List";
      }
    }
  };

  return (
    <>
      <h2 className="font-semibold text-2xl mb-4">{renderTitle()}</h2>

      <Table columns={columns} dataSource={data} rowKey="reportId" />
    </>
  );
};

export default ReportList;
