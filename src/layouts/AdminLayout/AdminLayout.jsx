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
        label: "Product Category",
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
        label: "Post Category",
        children: [
          {
            key: "sub1",
            label: <Link to="/admin/postCategories">List Post Category</Link>,
          },
          {
            key: "sub2",
            label: <Link to="/admin/postCategories/add">Add Post Category</Link>,
          },
        ],
      });
      menuItems.splice(1, 0, {
        key: "4",
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
      menuItems.splice(1, 0, {
        key: "5",
        icon: <AppstoreOutlined />,
        label: "Report",
        children: [
          {
            key: "sub31",
            label: (
              <Link to="/admin/reports/?type=processing">
                List processing Report
              </Link>
            ),
          },
          {
            key: "sub32",
            label: (
              <Link to="/admin/reports/?type=approved">
                List Approved Report
              </Link>
            ),
          },
          {
            key: "sub33",
            label: (
              <Link to="/admin/reports/?type=rejected">
                List Rejected Report
              </Link>
            ),
          },

        ],
      });
      menuItems.splice(1, 0, {
        key: "6",
        icon: <AppstoreOutlined />,
        label: "Post",
        children: [
          {
            key: "sub41",
            label: (
              <Link to="/admin/posts/?type=processing">
                List Processing Post
              </Link>
            ),
          },
          {
            key: "sub42",
            label: (
              <Link to="/admin/posts/?type=approved">
                List Approved Post
              </Link>
            ),
          },
        ],
      });
      menuItems.splice(1, 0, {
        key: "7",
        icon: <AppstoreOutlined />,
        label: "Transaction",
        children: [
          {
            key: "sub51",
            label: (
              <Link to="/admin/transactions">
                List Transaction
              </Link>
            ),
          },
        ],
      });
      menuItems.splice(1, 0, {
        key: "8",
        icon: <AppstoreOutlined />,
        label: "Order",
        children: [
          {
            key: "sub61",
            label: (
              <Link to="/admin/orders">
                List Order
              </Link>
            ),
          },
          {
            key: "sub62",
            label: (
              <Link to="/admin/orders/?type=shipping">
                List Successful Order
              </Link>
            ),
          },
          {
            key: "sub63",
            label: (
              <Link to="/admin/orders/?type=cancelled">
                List Cancelled Order
              </Link>
            ),
          },
          {
            key: "sub64",
            label: (
              <Link to="/admin/orders/?type=pending">
                List Pending Order
              </Link>
            ),
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

      menuItems.splice(1, 0, {
        key: "4",
        icon: <AppstoreOutlined />,
        label: "Post",
        children: [
          {
            key: "sub41",
            label: <Link to="/admin/posts/add">Add Post</Link>,
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
