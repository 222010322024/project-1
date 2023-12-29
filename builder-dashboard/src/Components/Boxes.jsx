// import React, { useEffect, useState } from "react";
// import Box from "./Box";
// import axios from "axios";
// import { baseURL } from "../utils/baseURL";
// import CloudinaryVideoUploader from "./CloudinaryVideoUploader";
// import Button from "./Button";
// import "../css/box.css";
// import "../css/button.css";

// const Boxes = ({ render, setRender, signPages }) => {
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file && file.type === "image/jpeg") {
//       setIsButtonDisabled(true);
//       try {
//         const formData = new FormData();
//         formData.append("image", file);
//         const { data } = await axios.post(`${baseURL}/images`, formData);
//         setIsButtonDisabled(false);

//         if (data) {
//           setRender((prev) => !prev);
//         }
//       } catch (error) {}
//     } else {
//       console.error("Invalid file type. Please select a JPG image.");
//     }
//   };

//   const handleUploadButtonClick = () => {
//     document.getElementById("image-upload").click();
//   };

//   return (
//     <div className="boxes">
//       <Box
//         title="Total Signages"
//         bColor="#452983"
//         value={signPages.length || 0}
//       />
//       <Box
//         title="To be revised"
//         bColor="#ED8E37"
//         value={signPages?.filter((el) => !el.isReviewed).length || 0}
//         color="#ED8E37"
//       />
//       <Box
//         title="Accuracy last 7 days"
//         bColor="#452983"
//         value="73%"
//         color="#452983"
//       />
//       <button
//         className={`${isButtonDisabled ? "disabled" : "btn"}`}
//         disabled={isButtonDisabled}
//         onClick={handleUploadButtonClick}
//         style={{
//           position: "relative",
//           backgroundColor: isButtonDisabled && "#6a549c",
//         }}
//       >
//         {isButtonDisabled ? (
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               fontWeight: "bold",
//               color: "white",
//             }}
//           >
//             Loading...
//           </div>
//         ) : (
//           "Upload"
//         )}
//       </button>
//       <input
//       type="file"
//       id="image-upload"
//       accept=".jpg, .jpeg"
//       style={{ display: "none" }}
//       onChange={handleImageChange}
//     />
//       <button
//         className={`${isButtonDisabled ? "disabled" : "btn"}`}
//         disabled={isButtonDisabled}
//         onClick={CloudinaryVideoUploader}
//         style={{
//           position: "relative",
//           backgroundColor: isButtonDisabled && "#6a549c",
//         }}
//       >
//         {isButtonDisabled ? (
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               fontWeight: "bold",
//               color: "white",
//             }}
//           >
//             Loading...
//           </div>
//         ) : (
//           "Upload Video"
//         )}
//       </button>

//     </div>
//   );
// };

// export default Boxes;


import React, { useState } from "react";
import Box from "./Box";
import axios from "axios";
import { baseURL } from "../utils/baseURL";
import CloudinaryVideoUploader from "./CloudinaryVideoUploader";
import Button from "./Button";
import "../css/box.css";
import "../css/button.css";

const Boxes = ({ render, setRender, signPages }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showVideoUploader, setShowVideoUploader] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/jpeg") {
      setIsButtonDisabled(true);
      try {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await axios.post(`${baseURL}/images`, formData);
        setIsButtonDisabled(false);

        if (data) {
          setRender((prev) => !prev);
        }
      } catch (error) {}
    } else {
      console.error("Invalid file type. Please select a JPG image.");
    }
  };

  const handleUploadButtonClick = () => {
    document.getElementById("image-upload").click();
  };

  const handleVideoUploadButtonClick = () => {
    setShowVideoUploader(true);
  };

  return (
    <div className="boxes">
      <Box
        title="Total Signages"
        bColor="#452983"
        value={signPages.length || 0}
      />
      <Box
        title="To be revised"
        bColor="#ED8E37"
        value={signPages?.filter((el) => !el.isReviewed).length || 0}
        color="#ED8E37"
      />
      <Box
        title="Accuracy last 7 days"
        bColor="#452983"
        value="73%"
        color="#452983"
      />
      <div>
        {/* "Upload" button */}
        <button
          className={`${isButtonDisabled ? "disabled" : "btn"}`}
          disabled={isButtonDisabled}
          onClick={handleUploadButtonClick}
          style={{
            position: "relative",
            backgroundColor: isButtonDisabled && "#6a549c",
          }}
        >
          {isButtonDisabled ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Loading...
            </div>
          ) : (
            "Upload"
          )}
        </button>
        {/* "Upload Video" button */}
        <button
          className={`${isButtonDisabled ? "disabled" : "btn"}`}
          disabled={isButtonDisabled}
          onClick={handleVideoUploadButtonClick}
          style={{
            position: "relative",
            backgroundColor: isButtonDisabled && "#6a549c",
            marginTop: "10px", // Adjust the margin as needed
          }}
        >
          {isButtonDisabled ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Loading...
            </div>
          ) : (
            "Upload Video"
          )}
        </button>
      </div>
      <input
        type="file"
        id="image-upload"
        accept=".jpg, .jpeg"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      {showVideoUploader && <CloudinaryVideoUploader />}
    </div>
  );
};

export default Boxes;
