import { Button, Form, Input, message, InputNumber  } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import accountApi from "../../../api/accountApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAccount = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);


  const onSubmit = async (values) => {
    try {
      await accountApi.createAccount(values);
      message.success("Add account successfully");

      navigate("/admin/accounts");
    } catch (error) {
      message.error("Failed to add account", error);
    }
  };

    // // Fetch roles from database
    // useEffect(() => {
    //     const fetchRoles = async () => {
    //       try {
    //         const response = await accountApi.getRole(); 
    //       } catch (error) {
    //         message.error("Failed to load roles");
    //       }
    //     };
    
    //     fetchRoles();
    //   }, []);

  return (
    <>
      <h2 className="font-semibold text-2xl mb-4">Add Account</h2>

      <Form layout="vertical" onFinish={onSubmit}>
        <FormItem
          label="User Name"
          name="userName"
          rules={[
            {
              required: true,
              message: "Please enter name",
            },
          ]}
        >
          <Input placeholder="Enter User name" />
        </FormItem>

        <FormItem
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please enter fullName",
            },
          ]}
        >
          <TextArea placeholder="Enter fullName" />
        </FormItem>

        <FormItem
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter phone",
            },
          ]}
        >
          <TextArea placeholder="Enter phone" />
        </FormItem>

        <FormItem
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter email",
            },
          ]}
        >
          <TextArea placeholder="Enter email" />
        </FormItem>

        <FormItem
            label="Role"
            name="roleId"
            rules={[
                {
                required: true,
                message: "Please enter role",
                },
            ]}
            >
            <InputNumber placeholder="Enter role ID" style={{ width: '100%' }} />
        </FormItem>

        {/* <FormItem
      label="Role"
      name="roleId"
      rules={[
        {
          required: true,
          message: "Please select a role",
        },
      ]}
    >
      <Select placeholder="Select Role">
        {roles.map((role) => (
          <Option key={role.id} value={role.id}>
            {role.name}
          </Option>
        ))}
      </Select>
    </FormItem> */}

        <Button type="primary" htmlType="submit" className="mt-3">
          Add account
        </Button>
      </Form>
    </>
  );
};

export default AddAccount;
