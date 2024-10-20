import { useMutation } from "@tanstack/react-query";
import { Button, Result, Spin } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import paymentApi from "../../api/paymentApi";

const PaymentReturn = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["PAYOS_CALLBACK"],
    mutationFn: (params) => paymentApi.payOsCallBack(params),
  });

  useEffect(() => {
    let params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    mutate(params);
  }, [status]);

  if (status && status === "PAID") {
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

  if (status && status !== "PAID") {
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

export default PaymentReturn;
