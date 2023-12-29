import React, { useState } from "react";
import "../css/items.css";
import Item from "./Item";
import EditModal from "../component/EditModal";

const Items = ({ render, setRender, signPages, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <EditModal
        isOpen={isModalOpen}
        handleClose={() => {
          setIsModalOpen(false);
        }}
        values={signPages.find((el) => el?._id === selected)}
        setRender={setRender}
      />
      <div className="items">
        <div className="item-title">
          <span>Signages</span>
        </div>
        <div className="tab">
          <table>
            <tr className="header">
              <th>Reviewed ?</th>
              <th style={{ textAlign: "center" }}>Type</th>
              <th style={{ textAlign: "center" }}>Date / Timestamp</th>
              <th>Spotted at Location</th>
              <th>Result</th>
              <th>Services</th>
            </tr>
            {isLoading ? (
              <h5>Loading...</h5>
            ) : (
              signPages.map((el, index) => {
                return (
                  <Item
                    key={index}
                    setIsModalOpen={setIsModalOpen}
                    {...el}
                    setSelected={setSelected}
                    setRender={setRender}
                  />
                );
              })
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Items;
