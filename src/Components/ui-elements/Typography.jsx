import React from "react";
import PropTypes from "prop-types";

const Typography = ({ variant, children }) => {
  let className = "";

  switch (variant) {
    case "h1":
      className = "font-urbane text-h1 text-neutralColor";
      break;
    case "h2":
      className = "font-urbane text-h2 text-neutralColor";
      break;
    case "h3":
      className = "font-urbane text-h3 text-neutralColor";
      break;
    case "body":
      className = "font-segoe text-body text-neutralColor";
      break;
    default:
      className = "font-segoe text-body text-neutralColor";
  }

  return <div className={className}>{children}</div>;
};

Typography.propTypes = {
  variant: PropTypes.oneOf(["h1", "h2", "h3", "body"]).isRequired,
  children: PropTypes.node.isRequired,
};

export default Typography;
