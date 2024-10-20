import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Modal } from "antd";

import { FaTimes } from "react-icons/fa";
import shippingAddressApi from "../../../api/shippingAddressApi";

const AddAddressModal = (props) => {
  const { open, onClose, onSuccess } = props;

  const [form] = Form.useForm();

  const { mutate: onAddAddress } = useMutation({
    mutationKey: ["ADD_ADDRESS"],
    mutationFn: (data) => {
      return shippingAddressApi.addAddress(data);
    },
    onSuccess: () => {
      onClose();
      onSuccess();
      form.resetFields();
    },
  });

  const onSubmit = (values) => {
    onAddAddress(values);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      closeIcon={<FaTimes className="text-[16px]" />}
      footer={<></>}
    >
      <div className="flex items-center justify-between">
        <p className="uppercase text-[16px] font-semibold text-[#333]">
          Add new address
        </p>
      </div>

      <hr className="h-[1px] bg-[#CFCFCF] mt-3 -mx-5" />

      <Form form={form} onFinish={onSubmit} layout="vertical" className="mt-4">
        <p className="font-semibold text-[16px] text-[#333] mb-3">
          Phone number
        </p>

        <Form.Item
          name="phone"
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
          <Input placeholder="Enter phone" className="rounded" size="large" />
        </Form.Item>

        <p className="font-semibold text-[16px] text-[#333] mb-3">Address</p>

        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Please enter address",
            },
          ]}
        >
          <Input placeholder="Enter address" size="large" />
        </Form.Item>

        <Button
          htmlType="submit"
          className="uppercase !bg-[#f97316] mt-5 !text-white h-[40px] w-full border !border-[#f97316]"
        >
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default AddAddressModal;
