import React, { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import ratingApi from "../../api/ratingApi";
import { Empty, Rate, Spin } from "antd";
import classNames from "classnames";

import "./index.css";

const ReviewList = ({ data = [] }) => {
  if (data.length === 0) {
    return <Empty />;
  }

  return data.map((it) => (
    <div className="flex gap-3 py-4 [&:not(:last-child)]:border-b" key={it.id}>
      <div className="w-12 h-12">
        <img
          src="https://picsum.photos/200/200"
          alt="User avatar"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <div>
        <p className="font-medium">User Demo</p>
        <Rate value={it.rating} allowHalf disabled className="text-base" />
        <p className="text-sm text-gray-500">{it.createdTime}</p>

        <p className="whitespace-pre-line mt-2 text-sm">{it.description}</p>
      </div>
    </div>
  ));
};

const RatingTab = ({ data }) => {
  const [activeTab, setActiveTab] = useState("ALL");

  const { data: reviews } = useQuery({
    queryKey: ["PRODUCT_REVIEWS", data.productId],
    queryFn: async () => {
      const res = await ratingApi.getProductRating(data.productId);

      return res.data;
    },
  });

  const reviewData = useMemo(() => {
    if (!reviews) return null;

    const totalRating = reviews.reduce(
      (total, curr) => (total += curr.rating),
      0
    );

    const rating1 = reviews.filter((x) => x.rating === 1);
    const rating2 = reviews.filter((x) => x.rating === 2);
    const rating3 = reviews.filter((x) => x.rating === 3);
    const rating4 = reviews.filter((x) => x.rating === 4);
    const rating5 = reviews.filter((x) => x.rating === 5);

    const avg = (totalRating / reviews.length).toFixed(1);

    return { avg, rating1, rating2, rating3, rating4, rating5 };
  }, [reviews]);

  const reviewsContent = useMemo(() => {
    if (activeTab === "ALL") {
      return reviews;
    }

    return reviewData[`rating${activeTab}`];
  }, [activeTab, reviewData, reviews]);

  if (!reviewData) return <Empty className="my-10" />;

  return (
    <div className="my-10">
      <div className="bg-[#fffbf8] border border-[#f9ede5] p-6 flex items-center gap-6 mb-12">
        <div>
          <p className="text-[#ee4d2d]">
            <span className="text-3xl font-semibold">{reviewData.avg}</span>{" "}
            <span className="text-lg">trên 5</span>
          </p>

          <Rate
            allowHalf
            defaultValue={reviewData.avg}
            disabled
            className="mt-1"
          />
        </div>

        <div className="flex gap-3 flex-wrap flex-1">
          <p
            className={classNames(
              "min-w-[100px] text-center px-2 py-1.5 cursor-pointer border border-[#00000017] bg-white",
              {
                "text-[#ee4d2d] border-[#ee4d2d]": activeTab === "ALL",
              }
            )}
            onClick={() => setActiveTab("ALL")}
          >
            Tất cả
          </p>
          <p
            className={classNames(
              "min-w-[100px] text-center px-2 py-1.5 cursor-pointer border border-[#00000017] bg-white",
              {
                "text-[#ee4d2d] border-[#ee4d2d]": activeTab === "5",
              }
            )}
            onClick={() => setActiveTab("5")}
          >
            5 Sao
            {reviewData.rating5.length > 0
              ? `(${reviewData.rating5.length})`
              : ""}
          </p>
          <p
            className={classNames(
              "min-w-[100px] text-center px-2 py-1.5 cursor-pointer border border-[#00000017] bg-white",
              {
                "text-[#ee4d2d] border-[#ee4d2d]": activeTab === "4",
              }
            )}
            onClick={() => setActiveTab("4")}
          >
            4 Sao
            {reviewData.rating4.length > 0
              ? `(${reviewData.rating4.length})`
              : ""}
          </p>
          <p
            className={classNames(
              "min-w-[100px] text-center px-2 py-1.5 cursor-pointer border border-[#00000017] bg-white",
              {
                "text-[#ee4d2d] border-[#ee4d2d]": activeTab === "3",
              }
            )}
            onClick={() => setActiveTab("3")}
          >
            3 Sao
            {reviewData.rating3.length > 0
              ? `(${reviewData.rating3.length})`
              : ""}
          </p>
          <p
            className={classNames(
              "min-w-[100px] text-center px-2 py-1.5 cursor-pointer border border-[#00000017] bg-white",
              {
                "text-[#ee4d2d] border-[#ee4d2d]": activeTab === "2",
              }
            )}
            onClick={() => setActiveTab("2")}
          >
            2 Sao
            {reviewData.rating2.length > 0
              ? `(${reviewData.rating2.length})`
              : ""}
          </p>
          <p
            className={classNames(
              "min-w-[100px] text-center px-2 py-1.5 cursor-pointer border border-[#00000017] bg-white",
              {
                "text-[#ee4d2d] border-[#ee4d2d]": activeTab === "1",
              }
            )}
            onClick={() => setActiveTab("1")}
          >
            1 Sao{" "}
            {reviewData.rating1.length > 0
              ? `(${reviewData.rating1.length})`
              : ""}
          </p>
        </div>
      </div>

      <ReviewList data={reviewsContent} />
    </div>
  );
};

export default RatingTab;
