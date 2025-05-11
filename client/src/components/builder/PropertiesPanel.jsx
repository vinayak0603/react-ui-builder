
import React from "react";
import { useBuilder } from "@/contexts/BuilderContext";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PropertiesPanel = () => {
  const { selectedElement, updateElement } = useBuilder();

  if (!selectedElement) {
    return (
      <div className="bg-builder-panel-bg p-4 border-l border-builder-border h-full">
        <h2 className="font-semibold mb-4 text-lg">Properties</h2>
        <div className="text-gray-500 text-center mt-8">
          <p>Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  const handleContentChange = (value) => {
    updateElement(selectedElement.id, { content: value });
  };

  const handleStyleChange = (property, value) => {
    updateElement(selectedElement.id, {
      style: { ...selectedElement.style, [property]: value },
    });
  };

  const handleSizeChange = (dimension, value) => {
    updateElement(selectedElement.id, {
      size: { ...selectedElement.size, [dimension]: value },
    });
  };

  return (
    <div className="bg-builder-panel-bg p-4 border-l border-builder-border h-full overflow-auto">
      <h2 className="font-semibold mb-4 text-lg">Properties</h2>
      
      <Card className="p-4 mb-4">
        <h3 className="font-medium mb-2">Element Type: {selectedElement.type}</h3>
        
        <div className="space-y-4">
          {selectedElement.type === "text" && (
            <div>
              <Label htmlFor="text-content">Content</Label>
              <Textarea
                id="text-content"
                value={selectedElement.content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="mt-1"
              />
            </div>
          )}
          
          {selectedElement.type === "image" && (
            <div>
              <Label htmlFor="image-src">Image Source</Label>
              <Input
                id="image-src"
                value={selectedElement.content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="mt-1"
                placeholder="URL or path to image"
              />
            </div>
          )}
          
          {selectedElement.type === "button" && (
            <div>
              <Label htmlFor="button-text">Button Text</Label>
              <Input
                id="button-text"
                value={selectedElement.content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="mt-1"
              />
            </div>
          )}
        </div>
      </Card>
      
      <Tabs defaultValue="layout">
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>
        
        <TabsContent value="layout">
          <Card className="p-4">
            <h3 className="font-medium mb-2">Position & Size</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pos-x">X Position</Label>
                <Input
                  id="pos-x"
                  type="number"
                  value={selectedElement.position.x}
                  onChange={(e) => updateElement(selectedElement.id, { 
                    position: { ...selectedElement.position, x: parseInt(e.target.value) }
                  })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="pos-y">Y Position</Label>
                <Input
                  id="pos-y"
                  type="number"
                  value={selectedElement.position.y}
                  onChange={(e) => updateElement(selectedElement.id, {
                    position: { ...selectedElement.position, y: parseInt(e.target.value) }
                  })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  value={selectedElement.size.width}
                  onChange={(e) => handleSizeChange("width", e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  value={selectedElement.size.height}
                  onChange={(e) => handleSizeChange("height", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="style">
          <Card className="p-4">
            <h3 className="font-medium mb-2">Styling</h3>
            
            <div className="space-y-4">
              {(selectedElement.type === "text" || selectedElement.type === "button") && (
                <>
                  <div>
                    <Label htmlFor="color">Text Color</Label>
                    <div className="flex mt-1">
                      <Input
                        id="color"
                        type="color"
                        value={selectedElement.style.color || "#000000"}
                        onChange={(e) => handleStyleChange("color", e.target.value)}
                        className="w-10 p-0 mr-2"
                      />
                      <Input
                        value={selectedElement.style.color || "#000000"}
                        onChange={(e) => handleStyleChange("color", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {selectedElement.type === "text" && (
                    <div>
                      <Label htmlFor="fontSize">Font Size</Label>
                      <Input
                        id="fontSize"
                        value={selectedElement.style.fontSize || "16px"}
                        onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="textAlign">Text Align</Label>
                    <Select
                      value={selectedElement.style.textAlign || "left"}
                      onValueChange={(value) => handleStyleChange("textAlign", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              {selectedElement.type === "button" && (
                <div>
                  <Label htmlFor="bgColor">Background Color</Label>
                  <div className="flex mt-1">
                    <Input
                      id="bgColor"
                      type="color"
                      value={selectedElement.style.backgroundColor || "#4F46E5"}
                      onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                      className="w-10 p-0 mr-2"
                    />
                    <Input
                      value={selectedElement.style.backgroundColor || "#4F46E5"}
                      onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="padding">Padding</Label>
                <Input
                  id="padding"
                  value={selectedElement.style.padding || "0px"}
                  onChange={(e) => handleStyleChange("padding", e.target.value)}
                  className="mt-1"
                  placeholder="e.g. 8px or 8px 16px"
                />
              </div>
              
              <div>
                <Label htmlFor="borderRadius">Border Radius</Label>
                <Input
                  id="borderRadius"
                  value={selectedElement.style.borderRadius || "0px"}
                  onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
                  className="mt-1"
                  placeholder="e.g. 4px"
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertiesPanel;
