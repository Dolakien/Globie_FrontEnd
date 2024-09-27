import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaRegNewspaper,
  FaShoppingCart,
  FaRegEnvelope,
  FaBars,
} from "react-icons/fa";
import { TOKEN_STORAGE_KEY } from "../constants";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showOrders, setShowOrders] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isLogged = localStorage.getItem(TOKEN_STORAGE_KEY);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Xử lý tìm kiếm ở đây
    console.log("Searching for:", searchQuery);
  };

  const handleMouseEnterOrderDropDown = () => {
    setShowOrders(true);
  };

  const handleMouseLeaveOrderDropDown = () => {
    setShowOrders(false);
  };

  const handleMouseEnterMenuDropDown = () => {
    setMenuOpen(true);
  };

  const handleMouseLeaveMenuDropDown = () => {
    setMenuOpen(false);
  };

  const onSignOut = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.location.href = "/login";
  };

  return (
    <>
      <header className="mid-header">
        <div className="header-left">
          <Link to="/" className="site-name">
            <img
              src="https://e7.pngegg.com/pngimages/779/61/png-clipart-logo-idea-cute-eagle-leaf-logo.png"
              alt="Globie Logo"
              className="logo"
            />
            Globie
          </Link>
        </div>
        <nav className="header-right">
          <Link to="/message" className="nav-link">
            <FaRegEnvelope size={20} />
            <span>Tin nhắn</span>
          </Link>
          <div
            className="nav-link"
            onMouseEnter={handleMouseEnterOrderDropDown}
            onMouseLeave={handleMouseLeaveOrderDropDown}
          >
            <Link to="/build-configuration" className="nav-link">
              <FaShoppingCart size={20} />
              <span>Đơn hàng</span>
            </Link>
            {/* Phần hiển thị các ô đơn hàng */}
            {showOrders && (
              <div className="orders-dropdown">
                <Link to="/buy-orders" className="order-link">
                  Đơn mua
                </Link>
                <Link to="/sell-orders" className="order-link">
                  Đơn bán
                </Link>
              </div>
            )}
          </div>
          <Link to="/view-post" className="nav-link">
            <FaRegNewspaper size={20} />
            <span>Quản lý tin</span>
          </Link>
          {isLogged ? (
            <p className="logout-btn" onClick={onSignOut}>
              Đăng xuất
            </p>
          ) : (
            <Link to="/login" className="nav-link login-button">
              <FaUser size={20} />
              <span>Đăng nhập</span>
            </Link>
          )}
        </nav>
      </header>
      <header className="small-header">
        <div
          className="menu-container"
          onMouseEnter={handleMouseEnterMenuDropDown}
          onMouseLeave={handleMouseLeaveMenuDropDown}
        >
          <button onClick={toggleMenu} className="menu-button">
            <FaBars size={24} /> {/* Biểu tượng ba gạch ngang */}
            <span>Danh mục</span>
          </button>
          {menuOpen && (
            <nav className="menu-dropdown">
              <a href="#home" className="menu-link">
                Home
              </a>
              <a href="#services" className="menu-link">
                Services
              </a>
              <a href="#contact" className="menu-link">
                Contact
              </a>
              {/* Thêm các liên kết khác nếu cần */}
            </nav>
          )}
        </div>
        <div className="search-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm trong Globie"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <span role="img" aria-label="search">
                🔍
              </span>{" "}
              {/* Biểu tượng tìm kiếm */}
            </button>
          </form>
        </div>
      </header>
    </>
  );
};

export default Header;
