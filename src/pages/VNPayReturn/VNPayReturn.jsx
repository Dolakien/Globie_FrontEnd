import { useMutation } from "@tanstack/react-query";
import { Button, Result, Spin } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import paymentApi from "../../api/paymentApi";

const VNPayReturn = () => {
  const [searchParams] = useSearchParams();
  const responseCode = searchParams.get("vnp_ResponseCode");

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["VNPAY_CALLBACK"],
    mutationFn: (params) => paymentApi.vnpayCallBack(params),
  });

  useEffect(() => {
    if (responseCode === "00") {
      let params = {};
      for (let [key, value] of searchParams.entries()) {
        params[key] = value;
      }
      mutate(params);
    }
  }, [responseCode]);

  if (responseCode && responseCode === "00") {
    return (
      <Result
        title="Payment successfully"
        status="success"
        subTitle="Thank for your orders"
        className="my-16"
        extra={[
          <Button onClick={() => navigate("/")} type="primary" key="console">
            Return to homepage
          </Button>,
        ]}
      />
    );
  }

  if (responseCode && responseCode !== "00") {
    return (
      <Result
        title="Payment failed"
        status="error"
        subTitle="An error occurred, please try again"
        className="my-16"
        extra={[
          <Button onClick={() => navigate("/")} type="primary" key="console">
            Return to homepage
          </Button>,
          <Button key="buy">Try Again</Button>,
        ]}
      />
    );
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Spin />
    </div>
  );
};

export default VNPayReturn;
