import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import categoryApi from "../../../api/categoryApi";
import { useForm } from "react-hook-form";
import postApi from "../../../api/postApi";
import { message } from "antd";

const CreatePost = () => {
  const { register, handleSubmit, reset } = useForm();

  const [fileList, setFileList] = useState([]);

  const { data: categories } = useQuery({
    queryKey: ["CATEGORIES"],
    queryFn: async () => {
      const res = await categoryApi.getAllPostCategory();

      return res.data.data;
    },
  });

  const { mutate: onCreatePost } = useMutation({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (data) => {
      const res = await postApi.createPost(data);

      const formData = new FormData();
      Array.from(fileList).forEach((file) => formData.append("files", file));
      await postApi.uploadImages(res.data.data.postId, formData);

      return res;
    },
    onSuccess: () => {
      message.success("Create post successfully");
      reset();
      setFileList([]);
    },
    onError: () => {
      message.error("An error occurred, please try again");
    },
  });

  const onFileChange = (e) => {
    const files = e.target.files;
    setFileList(files);
  };

  const previewImages = useMemo(() => {
    if (!fileList) return [];

    return Array.from(fileList).map((it) => URL.createObjectURL(it));
  }, [fileList]);

  const onSubmit = (values) => {
    if (fileList.length === 0) {
      message.error("Please select at least 1 photo");
      return;
    }

    onCreatePost(values);
  };

  return (
    <>
      <div className="py-10 container mx-auto px-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <p className="mb-3 font-semibold text-lg">
              Post Image and Video
            </p>
            <label
              for="file"
              className="flex items-center justify-center rounded border border-[#434343] py-8 cursor-pointer"
            >
              <img src="/images/camera.png" alt="Camera icon" />
            </label>

            <input
              type="file"
              name=""
              id="file"
              hidden
              onChange={onFileChange}
              multiple
            />

            <div className="mt-4 flex gap-2 flex-wrap">
              {previewImages?.map((url, index) => (
                <img
                  alt="Preview"
                  src={url}
                  key={index}
                  className="block w-36 h-36 object-cover"
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="col-span-8">
            <div className="border cursor-pointer border-[#434343] px-4 py-3 rounded-md mt-10 flex items-center justify-between">
              <div>
                <p className="text-[#9D9D9D] font-semibold mb-1">
                  Post Listing Categories
                </p>

                <select
                  {...register("postCategoryId", {
                    required: "Vui lòng chọn danh mục của Blog",
                  })}
                  id=""
                  className="outline-none"
                >
                  <option value="">Select category</option>
                  {categories?.map((it) => (
                    <option
                      key={it.postCategoryId}
                      value={it.postCategoryId}
                    >
                      {it.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* <FaCaretDown className="text-3xl" /> */}
            </div>

            <div className="mt-6">
              <p className="font-semibold text-2xl">
                Post Title and Content
              </p>

              <div className="flex flex-col gap-y-2 mt-2">
                <input
                  type="text"
                  className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Title"
                  {...register("postTitle", {
                    required: true,
                  })}
                />

                <textarea
                  {...register("postContent", {
                    required: true,
                  })}
                  id=""
                  className="outline-none p-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Content"
                  rows={6}
                ></textarea>
              </div>
            </div>

            <div className="text-right mt-6">
              <button className="inline-flex ml-auto items-center bg-orange-500 rounded-md p-3 gap-x-2 text-white text-sm font-semibold">
                <p>Create Post</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
