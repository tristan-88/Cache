import React from "react";
import "./ToolTip.css";

const ToolTip = ({ contents }) => {
  return (
    <div className="tool-tip">
      <span className="tool-tip-text">
        {contents.map((content) => `${content} \n`)}
      </span>
    </div>
  );
};

export default ToolTip;
