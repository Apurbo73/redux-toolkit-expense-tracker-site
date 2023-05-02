import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="App">
      <div className="header">
        <h1>Track Your Expense !!</h1>
      </div>
      <div className="main">
        <div className="container">
          {children}
        </div>
      </div>
      <div className="footer">&copy;2023 Apurbo Deb Nath</div>
    </div>
  );
};

export default Layout;
