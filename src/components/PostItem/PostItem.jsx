import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { IoChatbox } from "react-icons/io5";

dayjs.extend(relativeTime);

const PostItem = ({ className, data }) => {
  return (
    <div
      className={classNames(
        className,
        "shadow-[0px_4px_14px_0px_#0000000F] rounded-lg overflow-hidden"
      )}
    >
      <div className="relative pt-[70%]">
        <img
          src="https://picsum.photos/300/300"
          alt="Post img"
          className="absolute w-full h-full top-0 right-0 bottom-0 left-0 bg-cover"
        />
      </div>

      <div className="p-3">
        <p className="text-sm text-[#FF7A00]">Fashion</p>

        <Link
          className="line-clamp-2 font-semibold my-2 text-[#262626]"
          to={`/blog/${data.postId}`}
        >
          {data.postTitle}
        </Link>

        <p className="line-clamp-3 text-[#555555]">{data.postContent}</p>

        <div className="flex items-center gap-4 mt-3 text-xs text-[#9D9D9D]">
          <p>{dayjs(data.createdTime).fromNow()}</p>

          <div className="flex items-center gap-1">
            <IoChatbox />
            <p>21</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
