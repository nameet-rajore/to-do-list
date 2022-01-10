import React from "react";

const Loading = () => {
  return (
    <>
      <div className="spinner-border text-primary justify-content-center align-self-center m-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );
};

export default Loading;
