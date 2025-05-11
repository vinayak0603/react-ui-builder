
import React, { useState, useRef, useEffect } from "react";
import { useBuilder } from "@/contexts/BuilderContext";
import { X } from "lucide-react";

const CanvasElement = ({ element }) => {
  const { selectElement, moveElement, deleteElement, selectedElement } = useBuilder();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const isSelected = selectedElement?.id === element.id;
  const elementRef = useRef(null);

  // Handle click on element
  const handleClick = (e) => {
    e.stopPropagation();
    selectElement(element.id);
  };

  // Handle delete button click
  const handleDelete = (e) => {
    e.stopPropagation();
    deleteElement(element.id);
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

  // Handle mouse move (for dragging)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && elementRef.current) {
        const parentRect = elementRef.current.parentElement?.getBoundingClientRect();
        if (!parentRect) return;

        // Calculate new position relative to parent
        const newX = e.clientX - parentRect.left - dragOffset.x;
        const newY = e.clientY - parentRect.top - dragOffset.y;

        // Ensure element doesn't go outside the canvas
        const boundedX = Math.max(0, Math.min(newX, parentRect.width - elementRef.current.offsetWidth));
        const boundedY = Math.max(0, Math.min(newY, parentRect.height - elementRef.current.offsetHeight));

        moveElement(element.id, { x: boundedX, y: boundedY });
      }
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

  // Render the element based on its type
  const renderElement = () => {
    switch (element.type) {
      case "text":
        return <p style={element.style}>{element.content}</p>;
      case "image":
        return (
          <img
            src={element.content}
            alt="Element"
            style={{ width: "100%", height: "100%", objectFit: "cover", ...element.style }}
          />
        );
      case "button":
        return <button style={{ width: "100%", height: "100%", ...element.style }}>{element.content}</button>;
      default:
        return null;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`absolute cursor-move ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      style={{
        left: `${element.position.x}px`,
        top: `${element.position.y}px`,
        width: element.size.width,
        height: element.size.height,
        touchAction: "none",
      }}
      onClick={handleClick}
      onMouseDown={handleDragStart}
    >
      {renderElement()}
      {isSelected && (
        <>
          <div className="absolute -top-1 -left-1 -right-1 -bottom-1 border-2 border-blue-500 pointer-events-none"></div>
          <button 
            className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 z-10 hover:bg-red-600"
            onClick={handleDelete}
          >
            <X size={16} />
          </button>
        </>
      )}
    </div>
  );
};

export default CanvasElement;
