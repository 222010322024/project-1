import React, { useState } from "react";
import "../css/items.css";
import moment from "moment/moment";
import axios from "axios";
import { baseURL } from "../utils/baseURL";

const Item = ({
  objectType,
  imgUrl,
  createdAt,
  result,
  isReviewed,
  location,
  service,
  setIsModalOpen,
  _id,
  setSelected,
  setRender,
}) => {
  const [resultExpanded, setResultExpanded] = useState(false);
  const [serviceExpanded, setServiceExpanded] = useState(false);
  const [isViewed, setIsViewed] = useState(isReviewed || false);

  const truncateString = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  };

  const handleIsReviewed = async (status) => {
    axios
      .patch(`${baseURL}/images/changeReview/${_id}`, {
        isReviewed: status,
      })
      .then(() => setRender((prev) => !prev))
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(isViewed);

  return (
    <tr
      className="card"
      style={{
        width: "100%",
      }}
    >
      <td
        style={{
          width: "10%",
        }}
      >
        <div className="section">
          {isViewed ? (
            <div>Reviewed ✅</div>
          ) : (
            <div className="item-btns">
              <button
                className="i-btn i-b1"
                onClick={() => handleIsReviewed(true)}
              >
                Yes
              </button>
              <button
                className="i-btn i-b2"
                onClick={() => {
                  setIsModalOpen(true);
                  setSelected(_id);
                }}
              >
                Edit
              </button>
            </div>
          )}
          <div className="item-img">
            <img src={imgUrl} alt="Image" className="main-img" />
          </div>
        </div>
      </td>
      <td width={"1%"}>
        <div className="type">
          {/* <div className="t-img">
            <img src={"../../group1.png"} alt="" />
          </div> */}
          <div className="t-desc">
            <span
              style={{
                fontFamily: "10px",
                fontWeight: "600",
              }}
            >
              {objectType}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="time-date">
          <div>
            <div className="date">
              <span>{moment(createdAt).format("MMMM Do YYYY")}</span>
            </div>
            <div className="time">
              <span>{moment(createdAt).format("LT")}</span>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="location">
          <div>
            <div className="l-desc">
              <span>{location?.replaceAll("�", "°")}</span>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="c-details">
          <div className="cname">
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {resultExpanded ? result : truncateString(result, 50)}
              {!resultExpanded && result.length > 50 && (
                <span
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    fontWeight: 400,
                  }}
                  onClick={() => setResultExpanded(true)}
                >
                  View More
                </span>
              )}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="c-details">
          <div className="cname">
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "blue",
              }}
            >
              {serviceExpanded ? service : truncateString(service, 50)}
              {!serviceExpanded && service.length > 50 && (
                <span
                  style={{ color: "blue", cursor: "pointer", fontWeight: 400 }}
                  onClick={() => setServiceExpanded(true)}
                >
                  View More
                </span>
              )}
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Item;
