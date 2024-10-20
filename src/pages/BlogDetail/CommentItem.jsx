import dayjs from "dayjs";
import React, { useMemo } from "react";
import { TOKEN_STORAGE_KEY } from "../../constants";
import { message, Popconfirm } from "antd";
import { useMutation } from "@tanstack/react-query";
import commentApi from "../../api/commentApi";

const CommentItem = ({ data, onDeleteSuccess }) => {
  const isLogged = !!localStorage.getItem(TOKEN_STORAGE_KEY);

  const { mutate: onDeleteComment } = useMutation({
    mutationKey: ["DELETE_POST_COMMENT"],
    mutationFn: (id) => {
      return commentApi.deletePostComment(id);
    },
    onSuccess: () => {
      message.success("Delete comment successfully");
      onDeleteSuccess();
    },
  });

  const showDeleteBtn = useMemo(() => {
    if (!isLogged) return false;

    return true;
  }, [isLogged]);

  return (
    <div className="flex items-center gap-3 mb-4">
      <img
        src="https://picsum.photos/300/300"
        alt="Avatar"
        className="w-14 h-14 rounded-full object-cover"
      />

      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">Demo</p>

          <p className="text-xs text-gray-500">
            {dayjs(data.createdTime).format("HH:mm DD, MM YYYY")}
          </p>
        </div>

        <p className="mt-1.5 whitespace-pre-line line-clamp-2">
          {data.content}
        </p>

        {showDeleteBtn && (
          <Popconfirm
            title="Delete comment"
            description="Are you sure you want to delete this comment?"
            onConfirm={() => onDeleteComment(data.id)}
          >
            <p className="text-xs font-medium cursor-pointer mt-2 text-gray-500">
              Xoá
            </p>
          </Popconfirm>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
