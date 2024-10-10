/* eslint-disable default-case */
import { Flex, message, Popconfirm, Table, Tag } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import postApi from "../../../api/postApi";
import { Dropdown, Menu} from 'antd'; // Make sure these are imported

const PostsList = () => {
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
          const res = await postApi.getAllPostApproved();
          data = res.data.data;
          break;
        }

        case "processing": {
          const res = await postApi.getAllPostProccessing();
          data = res.data.data;
          break;
        }
        default: {
          const res = await postApi.getAllPost();
          data = res.data.data;
        }
      }

      setData(data);
    } catch (error) {
      message.error("Failed to fetch");
    }
  }, [type]);

  const handleDeletePost = useCallback(
    async (id) => {
      try {
        await postApi.deletePost(id);
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
      await postApi.updatePostApproved(id);
      fetchData();
      message.success("Update status successfully");
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  const columns = useMemo(() => {
    const columns = [
      {
        title: "ID",
        key: "postId",
        dataIndex: "postId",
      },
      {
        title: "Post Title",
        dataIndex: "postTitle",
        key: "postTitle",
      },
      {
        title: "Post Content",
        dataIndex: "postContent",
        key: "postContent",
      },
      {
        title: "Created-Time",
        dataIndex: "createdTime",
        key: "createdTime",
      },
      {
        title: "Updated-Time",
        dataIndex: "updatedTime",
        key: "updatedTime",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => {
          return status ? (
            <Tag color="green">Approved</Tag>
          ) : (
            <Tag color="gold">Processing</Tag>
          );
        }
      },
      {
        title: "Post Category ID",
        dataIndex: "postCategoryId",
        key: "postCategoryId",
      },
      {
        title: "User ID",
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
              <Menu.Item key="approve" onClick={() => handleUpdateSttApproved(row.postId)}>
                Approve
              </Menu.Item>
            </Menu>
          );

          return (
            <Flex gap={8} align="center">
              <Popconfirm
                title="Delete post"
                description="Are you sure you want to delete this post?"
                onConfirm={() => handleDeletePost(row.postId)}
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

    return columns;
  }, [handleDeletePost, type]);

  const renderTitle = () => {
    switch (type) {
      case "approved": {
        return "Approved Post List";
      }
      case "processing": {
        return "Processing Post List";
      }
      default: {
        return "All Post List";
      }
    }
  };

  return (
    <>
      <h2 className="font-semibold text-2xl mb-4">{renderTitle()}</h2>

      <Table columns={columns} dataSource={data} rowKey="postId" />
    </>
  );
};

export default PostsList;
