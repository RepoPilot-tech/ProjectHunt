import React, { useState, useEffect } from "react";

export const FollowerPointerCard = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPointer({ x: e.clientX, y: e.clientY });
    };

    if (isInside) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      setPointer({ x: 0, y: 0 });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isInside]);

  return (
    <div
      style={{ position: "relative", cursor: "none" }}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
    >
      {isInside && (
        <div
          style={{
            position: "fixed",
            top: pointer.y,
            left: pointer.x,
            width: "10px",
            height: "10px",
            backgroundColor: "red",
            borderRadius: "50%",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {children}
    </div>
  );
};
