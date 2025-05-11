
import React, { useRef, useState } from "react";
import { useBuilder } from "@/contexts/BuilderContext";
import CanvasElement from "./CanvasElement";

const Canvas = () => {
  const { getCurrentPage, addElement, selectElement } = useBuilder();
  const currentPage = getCurrentPage();
  const canvasRef = useRef(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);

    // Get the element type from the drag data
    const elementType = e.dataTransfer.getData("elementType");
    if (!elementType) return;

    // Add the element to the canvas
    addElement(elementType);
  };

  const handleCanvasClick = (e) => {
    // Only deselect if the canvas itself is clicked (not a child element)
    if (e.target === canvasRef.current) {
      selectElement(null);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-white border-b border-builder-border p-2 text-center">
        <h2 className="text-sm font-medium">Canvas</h2>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-100 p-4 flex items-center justify-center">
        <div
          ref={canvasRef}
          className={`bg-builder-canvas-bg border-2 ${
            isDraggingOver ? "border-blue-400" : "border-builder-border"
          } rounded-md shadow-sm w-full max-w-[1024px] h-[600px] mx-auto relative overflow-auto`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleCanvasClick}
        >
          {currentPage?.elements.map((element) => (
            <CanvasElement key={element.id} element={element} />
          ))}
          
          {currentPage?.elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
              <div className="text-center">
                <p>Drag and drop elements here</p>
                <p className="text-sm">or use the quick add buttons</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
