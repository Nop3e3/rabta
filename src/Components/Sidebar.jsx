import React from "react";
import "./Sidebar.css";

export default function Sidebar() {
  return (

      <div className="sidebar">

        {/* Logo */}
        <h1 className="logo">rabta</h1>

        {/* Profile */}
        <div className="profile">
          <img
            src="https://i.pravatar.cc/150"
            alt="pfp"
            className="pfp"
          />
          <h2>Nayerah Mohanad</h2>
          <p className="username">@Nayerah.kotn</p>

          <div className="badge">
            <span className="material-icons">emoji_events</span>
            Exceptional contributor
          </div>

          <div className="stars">
            {"★★★★★"}
          </div>
          <p className="reviews">(124)</p>
        </div>

        {/* Menu */}
        <div className="menu">
          <p className="section">General</p>

          <div className="item active">
            <span className="material-icons">home</span>
            Home
          </div>

          <div className="item">
            <span className="material-icons">menu_book</span>
            Learning hub
          </div>

          <div className="item">
            <span className="material-icons">groups</span>
            Community
          </div>

          <div className="item">
            <span className="material-icons">bar_chart</span>
            Business health
          </div>

          <div className="item">
            <span className="material-icons">inventory_2</span>
            Discover suppliers
          </div>

          <div className="item">
            <span className="material-icons">school</span>
            Mentorship
          </div>

          <p className="section">Tools</p>

          <div className="item">
            <span className="material-icons">mail</span>
            Inbox
          </div>

          <div className="item">
            <span className="material-icons">account_balance_wallet</span>
            Wallet
          </div>

          <div className="item">
            <span className="material-icons">bookmark</span>
            Save Sellers
          </div>

          <div className="item">
            <span className="material-icons">settings</span>
            Settings
          </div>
        </div>

        {/* Logout */}
        <div className="logout">
          <span className="material-icons">logout</span>
          Log out
        </div>

      </div>
  
  );
}