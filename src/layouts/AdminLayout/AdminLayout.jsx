import React from "react";
import { AppstoreOutlined, BarChartOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const menuItems = [
    {
      key: "1",
      icon: <BarChartOutlined />,
      label: <Link>Dashboard</Link>,
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Category",
      children: [
        {
          key: "sub21",
          label: <Link to="/admin/categories">List Category</Link>,
        },
        {
          key: "sub22",
          label: <Link to="/admin/categories/add">Add Category</Link>,
        },
      ],
    },
  ];

  return (
    <Layout hasSider>
      <Sider style={siderStyle} width={256}>
        <Link
          to="/"
          className="text-white flex items-center justify-center font-semibold text-2xl text-center h-14"
        >
          Globie
        </Link>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>

      <Layout className="ml-64 min-h-screen">
        <Header className="bg-white text-right">
          <Dropdown
            menu={{
              items: [
                {
                  label: "Thông tin cá nhân",
                },
                {
                  label: "Đăng xuất",
                },
              ],
            }}
          >
            <div className="inline-flex items-center gap-x-2">
              <img
                src="https://picsum.photos/200/200"
                alt="Avatar"
                className="w-10 h-10 object-cover rounded-full"
              />

              <p className="font-medium">Hi, Admin</p>
            </div>
          </Dropdown>
        </Header>

        <Content className="mt-6 mx-4 overflow-[initial]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
