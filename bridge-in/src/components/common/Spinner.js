import React from "react";

export default function Spinner({ variant = "dark" }) {
  return (
    <div className={"spinner-border text-" + variant} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
