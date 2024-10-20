import { Breadcrumb, Button, Empty, message, Spin } from "antd";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import categoryApi from "../../api/categoryApi";
import { CiCalendar } from "react-icons/ci";
import postApi from "../../api/postApi";
import dayjs from "dayjs";
import { TOKEN_STORAGE_KEY } from "../../constants";
import TextArea from "antd/es/input/TextArea";
import commentApi from "../../api/commentApi";
import CommentItem from "./CommentItem";

const BlogDetail = () => {
  const { id } = useParams();

  const [comment, setComment] = useState("");

  const isLogged = !!localStorage.getItem(TOKEN_STORAGE_KEY);

  const { data: categories } = useQuery({
    queryKey: ["POST_CATE"],
    queryFn: async () => {
      const res = await categoryApi.getAllPostCategory();

      return res.data?.data ?? [];
    },
  });

  const { data: postDetail, isFetching } = useQuery({
    queryKey: ["POST_DETAIL", id],
    queryFn: async () => {
      const res = await postApi.getPostDetail(id);

      return res.data?.data;
    },
  });

  const { data: comments, refetch } = useQuery({
    queryKey: ["POST_COMMENT_LIST", id],
    queryFn: async () => {
      const res = await commentApi.getPostComment(id);

      return res.data.data;
    },
  });

  const commentMutation = useMutation({
    mutationKey: ["ADD_POST_COMMENT"],
    mutationFn: (content) => {
      return commentApi.addComment({ content, postId: id });
    },
    onSuccess: () => {
      setComment("");
      refetch();
    },
  });

  const onAddComment = () => {
    if (!isLogged) {
      return message.info("Please login to comment!");
    }
    commentMutation.mutate(comment);
  };

  if (isFetching) {
    return <Spin />;
  }

  return (
    <div className="container mx-auto px-3 py-10">
      <Breadcrumb
        items={[
          {
            title: <Link to="/">Homepage</Link>,
          },
          {
            title: "Blog",
          },
          {
            title: postDetail.postTitle,
          },
        ]}
      />

      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-9">
          <div className="relative pt-[50%]">
            <img
              src="https://picsum.photos/1000/1000"
              alt="Post img"
              className="absolute top-0 right-0  bottom-0 left-0 w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex items-center gap-1.5 mt-4">
            <CiCalendar className="text-xl" />
            <p>{dayjs(postDetail.createdTime).format("DD/MM/YYYY")}</p>
          </div>

          <h1 className="mt-4 font-semibold uppercase text-xl">
            {postDetail.postTitle}
          </h1>

          <p className="my-4 border-y py-4 leading-relaxed">
            {postDetail.postContent}
          </p>

          <div>
            <h2 className="font-medium text-lg uppercase">Your Comment</h2>

            <TextArea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Your message"
              className="mt-1"
              rows={6}
            />

            <Button
              className="!bg-[#f97316] mt-3 uppercase rounded-full !py-5 font-semibold"
              type="primary"
              onClick={onAddComment}
            >
              Send message
            </Button>

            <div className="mt-6">
              {comments?.length > 0 ? (
                comments.map((it) => (
                  <CommentItem
                    data={it}
                    key={it.id}
                    onDeleteSuccess={refetch}
                  />
                ))
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <h2 className="font-semibold uppercase text-2xl border-b-2 pb-1 border-b-[#FFD861]">
            Category
          </h2>

          <div className="mt-6">
            {categories?.map((it) => (
              <p className="my-2" key={it.postCategoryId}>
                {it.categoryName}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
