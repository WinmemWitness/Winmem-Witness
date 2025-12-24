import React from "react";

export function Window(props: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ background: "#c0c0c0", border: "2px solid #404040", boxShadow: "6px 6px 0 rgba(0,0,0,0.25)" }}>
      <div style={{ background: "#000080", color: "#fff", padding: "6px 10px", fontWeight: 800, display: "flex", justifyContent: "space-between" }}>
        <div>{props.title}</div>
        <div>{props.right}</div>
      </div>
      <div style={{ padding: 12 }}>{props.children}</div>
    </div>
  );
}
