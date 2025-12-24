import React from "react";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const style: React.CSSProperties = {
    background: "#c0c0c0",
    borderTop: "2px solid #ffffff",
    borderLeft: "2px solid #ffffff",
    borderRight: "2px solid #404040",
    borderBottom: "2px solid #404040",
    padding: "6px 10px",
    fontWeight: 700,
    cursor: "pointer"
  };
  return <button {...props} style={{ ...style, ...(props.style ?? {}) }} />;
}
