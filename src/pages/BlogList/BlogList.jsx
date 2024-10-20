import { Breadcrumb, Empty } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "../../api/categoryApi";
import PostItem from "../../components/PostItem/PostItem";
import postApi from "../../api/postApi";

const BlogList = () => {
  const { data: categories } = useQuery({
    queryKey: ["POST_CATE"],
    queryFn: async () => {
      const res = await categoryApi.getAllPostCategory();

      return res.data?.data ?? [];
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["POST_APPROVED"],
    queryFn: async () => {
      const res = await postApi.getAllPostApproved();

      return res.data?.data ?? [];
    },
  });

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
        ]}
      />

      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-9">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-12 gap-3">
              {posts.slice(0, 6).map((it) => (
                <PostItem key={it.postId} className="col-span-4" data={it} />
              ))}
            </div>
          ) : (
            <Empty className="my-20" />
          )}
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

export default BlogList;
