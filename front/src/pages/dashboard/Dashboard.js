import React from "react";
import Layout from "../../layout/Layout";
import "./Dashboard.css";
import studentimg from "./studentimg.jpg";

function Dashboard() {
  return (
    <>
      <Layout>
      <div className="login2">
        <h2>Welcome!</h2>
        <img src={studentimg} alt="image" />
      </div>
      </Layout>
    </>
  );
}

export default Dashboard;
