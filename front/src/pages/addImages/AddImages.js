import React, { useState } from "react";
import Layout from "../../layout/Layout";
import AddImageModal from "./AddImageModal";

const AddImages = () => {
  return (
    <>
      <Layout>
        <div className="warmup-content-wrappper">
          <div className="plan-wrapper">
            <div className="plan-table-heading">
              <h3>Albums</h3>
            </div>
            <AddImageModal />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddImages;
