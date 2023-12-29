import React, { useEffect, useState } from "react";
import "../App.css";
import Boxes from "./Boxes";
import Choice from "./Choice";
import Items from "./Items";
import Sidebar from "./Sidebar";
import axios from "axios";
import { baseURL } from "../utils/baseURL";

const Dashboard = () => {
  const [render, setRender] = useState(false);
  const [signPages, setSignPages] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await axios.get(`${baseURL}/images`);
      setIsLoading(false);

      if (isChecked) {
        setSignPages(data?.data?.images.filter((el) => el.isReviewed));
      } else {
        setSignPages(data?.data?.images);
      }
    })();
  }, [render, isChecked]);

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="main">
          <div className="inner">
            <Boxes
              render={render}
              setRender={setRender}
              signPages={signPages}
              isLoading={isLoading}
            />
            <Choice isChecked={isChecked} setIsChecked={setIsChecked} />
          </div>
          <Items
            render={render}
            setRender={setRender}
            signPages={signPages}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
