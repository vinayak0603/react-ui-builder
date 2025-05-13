import React, { useState, useRef, useEffect } from "react";
import { useBuilder } from "@/contexts/BuilderContext";
import { X } from "lucide-react";

const CanvasElement = ({ element }) => {
  const { selectElement, moveElement, deleteElement, selectedElement } = useBuilder();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);
  const isSelected = selectedElement?.id === element.id;

  // Handle element click
  const handleClick = (e) => {
    e.stopPropagation();
    selectElement(element.id);
  };

  // Handle drag start
  const handleDragStart = (e) => {
    e.stopPropagation();
    if (!elementRef.current) return;

    setIsDragging(true);
    const rect = elementRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !elementRef.current) return;

      const parentRect = elementRef.current.parentElement?.getBoundingClientRect();
      if (!parentRect) return;

      const newX = e.clientX - parentRect.left - dragOffset.x;
      const newY = e.clientY - parentRect.top - dragOffset.y;

      const boundedX = Math.max(0, Math.min(newX, parentRect.width - elementRef.current.offsetWidth));
      const boundedY = Math.max(0, Math.min(newY, parentRect.height - elementRef.current.offsetHeight));

      moveElement(element.id, { x: boundedX, y: boundedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, element.id, moveElement]);

  // Render content based on element type
  const renderElementContent = () => {
    const style = {
      width: "100%",
      height: "100%",
      ...element.style,
    };

    switch (element.type) {
      case "text":
        return <p style={style}>{element.content}</p>;
      case "image":
        return (
          <img
            src={element.content || "/placeholder.svg"}
            alt="Element"
            style={{ ...style, objectFit: "cover" }}
          />
        );
      case "button":
        return <button style={style}>{element.content}</button>;
      default:
        return <div style={style}>Unsupported</div>;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`absolute cursor-move ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        touchAction: "none",
        pointerEvents: "auto",
      }}
      onClick={handleClick}
      onMouseDown={handleDragStart}
    >
      {renderElementContent()}

      {isSelected && (
        <>
          <div className="absolute -top-1 -left-1 -right-1 -bottom-1 border-2 border-blue-500 pointer-events-none"></div>
          <button
            className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 z-10 hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(e);
            }}
          >
            <X size={16} />
          </button>
        </>
      )}
    </div>
  );

  function handleDelete(e) {
    e.stopPropagation();
    deleteElement(element.id);
  }
};

export default CanvasElement;
