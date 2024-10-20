import React, { useEffect } from "react";

import { Button, DatePicker, Form, Input, message, Radio } from "antd";
import useProfile from "../../../hooks/useProfile";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import accountapi from "../../../api/accountApi";

const UpdateInformation = () => {
  const { data, refetch } = useProfile();

  const [form] = Form.useForm();

  const { mutate: onUpdateProfile } = useMutation({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: ({ username, data }) =>
      accountapi.updateProfile(username, data),
    onSuccess: () => {
      message.success("Update profile successfully");
      refetch();
    },
    onError: () => {
      message.error("Error occurred please try again");
    },
  });

  useEffect(() => {
    if (!data) return;

    form.setFieldsValue({
      fullName: data.fullName,
      sex: data.sex,
      phone: data.phone,
      email: data.email,
      address: data.address,
      dob: dayjs(data.dob),
    });
  }, [data]);

  const onSubmit = (values) => {
    const payload = {
      ...values,
      dob: dayjs(values.dob).format("YYYY-MM-DD"),
    };

    onUpdateProfile({ username: data.userName, data: payload });
  };

  return (
    <>
      <h2 className="text-[24px] font-semibold px-6 py-4 text-[#333] leading-tight">
        Thông tin tài khoản
      </h2>

      <Form
        className="px-6 py-4 max-w-[580px]"
        labelCol={{ span: 8 }}
        size="large"
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item
          name="fullName"
          label={<p className="text-[16px]">Full Name</p>}
          className="mb-3"
          rules={[
            {
              required: true,
              message: "Please enter full name",
            },
          ]}
        >
          <Input placeholder="Full Name" className="rounded" />
        </Form.Item>

        <Form.Item
          name="sex"
          label={<p className="text-[16px]">Sex</p>}
          className="mb-3"
          rules={[
            {
              required: true,
              message: "Please choose sex",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="0">Male</Radio>

            <Radio value="1">Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="phone"
          label={<p className="text-[16px]">Phone</p>}
          rules={[
            {
              required: true,
              message: "Please enter phone number",
            },
            {
              pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
              message: "Phone invalid",
            },
          ]}
        >
          <Input placeholder="Phone" className="rounded" />
        </Form.Item>

        <Form.Item
          name="email"
          label={<p className="text-[16px]">Email</p>}
          rules={[
            {
              required: true,
              message: "Please enter email",
            },
            {
              type: "email",
              message: "Email invalid",
            },
          ]}
        >
          <Input placeholder="Email" className="rounded" />
        </Form.Item>

        <Form.Item
          name="address"
          label={<p className="text-[16px]">Address</p>}
          rules={[
            {
              required: true,
              message: "Please enter address",
            },
          ]}
        >
          <Input placeholder="Address" className="rounded" />
        </Form.Item>

        <Form.Item
          name="dob"
          label={<p className="text-[16px]">Birthday</p>}
          rules={[
            {
              required: true,
              message: "Please select birthday",
            },
          ]}
        >
          <DatePicker placeholder="Birthday" format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button
            htmlType="submit"
            className="uppercase rounded text-[14px] !bg-[#f97316] !text-white !border-[#f97316] min-w-28 font-semibold"
          >
            SAVE
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateInformation;
