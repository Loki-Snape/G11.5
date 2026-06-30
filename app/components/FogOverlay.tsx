import React from "react";

export default function FogOverlay() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent 60%)",
        opacity: 0.4,
      }}
    />
  );
}
