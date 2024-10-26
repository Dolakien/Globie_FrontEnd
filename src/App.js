import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ClientLayout from "./layouts/ClientLayout/ClientLayout";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import BuildPc from "./pages/BuildPc/BuildPc";
import PostProduct from "./pages/PostProduct/PostProduct";
import CreateStore from "./pages/Profile/CreateStore/CreateStore.jsx";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import ProductCategoryList from "./pages/Admin/ProductCategoryManager/ProductCategoryList";
import AddProductCategory from "./pages/Admin/ProductCategoryManager/AddProductCategory";
import ProductList from "./pages/Admin/ProductManager/ProductList";
import OrderList from "./pages/Admin/OrderManagement/OrderList.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AccountList from "./pages/Admin/AccountManager/AccountList";
import AddAccount from "./pages/Admin/AccountManager/AddAccount";
import ReportList from "./pages/Admin/ReportManager/ReportList";
import PostList from "./pages/Admin/PostManager/PostList";
import PostCategoryList from "./pages/Admin/PostCategoryManager/PostCategoryList";
import AddPostCategory from "./pages/Admin/PostCategoryManager/AddPostCategory";
import Home from "./pages/Home/Home";
import { default as ClientProductList } from "./pages/ProductList/ProductList";
import Cart from "./pages/Cart/Cart";
import ProfileLayout from "./layouts/ProfileLayout/ProfileLayout";
import ProfileOverview from "./pages/Profile/ProfileOverview/ProfileOverview";
import MyProducts from "./pages/Profile/MyProducts/MyProducts";
import EditProduct from "./pages/EditProduct/EditProduct";
import OrdersHistory from "./pages/Profile/OrdersHistory/OrdersHistory";
import BlogList from "./pages/BlogList/BlogList";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import PaymentReturn from "./pages/PaymentReturn/PaymentReturn";
import AddPost from "./pages/Admin/PostManager/AddPost";
import UpdateInformation from "./pages/Profile/UpdateInformation/UpdateInformation";
import Bookmark from "./pages/Profile/Bookmark/Bookmark";
import ProfileAddress from "./pages/Profile/ProfileAddress";
import Transaction from "./pages/Admin/TransactionManager/TransactionList";
import ProductSearch from "./pages/ProductList/ProductSearch";
import Profile from "./pages/Profile/index.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ClientLayout />} path="/">
          <Route element={<Home />} path="/" />
          <Route element={<ProductDetail />} path="/products/:id" />
          <Route element={<BuildPc />} path="/build-pc" />
          <Route element={<PostProduct />} path="/post-product" />
          <Route element={<ClientProductList />} path="products" />
          <Route element={<Cart />} path="cart" />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="information" element={<UpdateInformation />} />
            <Route path="my-products" element={<MyProducts />} />
            <Route path="my-products/:id/edit" element={<EditProduct />} />
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="orders-history" element={<OrdersHistory />} />
            <Route path="address" element={<ProfileAddress />} />
            <Route path="store" element={<CreateStore />} />
          </Route>
          <Route path="/payment-return" element={<PaymentReturn />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/search" element={<ProductSearch />} />
        </Route>

        {/* auth route */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* admin route */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="categories" element={<ProductCategoryList />} />
          <Route path="categories/add" element={<AddProductCategory />} />
          <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<OrderList />} />

          <Route path="accounts" element={<AccountList />} />
          <Route path="accounts/add" element={<AddAccount />} />
          <Route path="reports" element={<ReportList />} />
          <Route path="posts" element={<PostList />} />
          <Route path="posts/add" element={<AddPost />} />
          <Route path="postCategories" element={<PostCategoryList />} />
          <Route path="postCategories/add" element={<AddPostCategory />} />
          <Route path="transactions" element={<Transaction />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
