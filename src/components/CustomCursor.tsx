import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          ["BUTTON", "A", "INPUT"].includes(target.tagName),
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Titik Inti (Pengganti ujung panah mouse agar klik presisi) */}
      <div
        className="fixed top-0 left-0 w-4 h-4 bg-black rounded-full pointer-events-none z-[10000]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Lingkaran Luar (Efek Visual) */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-black pointer-events-none z-[9999] transition-all duration-150 ease-out ${
          isPointer ? "w-10 h-10 bg-primary/10 scale-125" : "w-8 h-8 scale-100"
        } ${isClicking ? "scale-90 opacity-80" : ""}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
};

export default CustomCursor;
