
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useBuilder } from "@/contexts/BuilderContext";
import { Text, Image, Square } from "lucide-react";

const ElementsPanel = () => {
  const { addElement } = useBuilder();

  const elementTypes = [
    { type: "text", name: "Text", icon: <Text className="w-4 h-4 mr-2" /> },
    { type: "image", name: "Image", icon: <Image className="w-4 h-4 mr-2" /> },
    { type: "button", name: "Button", icon: <Square className="w-4 h-4 mr-2" /> },
  ];

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("elementType", type);
  };

  return (
    <div className="bg-builder-panel-bg p-4 border-r border-builder-border h-full overflow-auto">
      <h2 className="font-semibold mb-4 text-lg">Elements</h2>
      <div className="space-y-2">
        {elementTypes.map((element) => (
          <Card 
            key={element.type}
            className="cursor-grab hover:bg-builder-element-hover transition-colors"
            draggable
            onDragStart={(e) => handleDragStart(e, element.type)}
          >
            <div className="p-3 flex items-center">
              {element.icon}
              <span>{element.name}</span>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium mb-2">Quick Add</h3>
        <div className="grid grid-cols-1 gap-2">
          {elementTypes.map((element) => (
            <Button
              key={element.type}
              variant="outline"
              size="sm"
              className="justify-start"
              onClick={() => addElement(element.type)}
            >
              {element.icon}
              <span>{element.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElementsPanel;
