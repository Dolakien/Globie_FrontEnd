import React, { useMemo } from "react";
import { AppstoreOutlined, BarChartOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { TOKEN_STORAGE_KEY, USER_ROLE_STORAGE_KEY } from "../../constants";
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
  const role = localStorage.getItem(USER_ROLE_STORAGE_KEY);

  const onLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_ROLE_STORAGE_KEY);
    window.location.href = "/login";
  };

  const menuItems = useMemo(() => {
    const menuItems = [
      {
        key: "1",
        icon: <BarChartOutlined />,
        label: <Link to="/admin">Dashboard</Link>,
      },
    ];

    if (role === "ADMIN") {
      menuItems.splice(1, 0, {
        key: "2",
        icon: <AppstoreOutlined />,
        label: "Category",
        children: [
          {
            key: "sub11",
            label: <Link to="/admin/categories">List Category</Link>,
          },
          {
            key: "sub12",
            label: <Link to="/admin/categories/add">Add Category</Link>,
          },
        ],
      });
      menuItems.splice(1, 0, {
        key: "3",
        icon: <AppstoreOutlined />,
        label: "Account",
        children: [
          {
            key: "sub21",
            label: <Link to="/admin/accounts">List Account</Link>,
          },
          {
            key: "sub22",
            label: <Link to="/admin/accounts/add">Add Account</Link>,
          },
        ],
      });
    }

    if (role === "STAFF") {
      menuItems.splice(1, 0, {
        key: "3",
        icon: <AppstoreOutlined />,
        label: "Product",
        children: [
          {
            key: "sub31",
            label: <Link to="/admin/products/?type=all">List Product</Link>,
          },
          {
            key: "sub32",
            label: (
              <Link to="/admin/products/?type=selling">
                List selling product
              </Link>
            ),
          },
          {
            key: "sub33",
            label: (
              <Link to="/admin/products/?type=processing">
                List processing product
              </Link>
            ),
          },
        ],
      });
    }

    return menuItems;
  }, [role]);

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
                  onClick: onLogout,
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
