
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

// Define element types
export type ElementType = "text" | "image" | "button";

// Define element properties
export interface ElementProps {
  id: string;
  type: ElementType;
  content: string;
  position: { x: number; y: number };
  size: { width: string; height: string };
  style: {
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: "left" | "center" | "right";
    padding?: string;
    borderRadius?: string;
  };
}

// Define page interface
export interface Page {
  id: string;
  name: string;
  elements: ElementProps[];
}

// Define context interface
interface BuilderContextProps {
  pages: Page[];
  currentPageId: string;
  selectedElement: ElementProps | null;
  addPage: (name: string) => void;
  addElement: (type: ElementType) => void;
  updateElement: (id: string, updates: Partial<ElementProps>) => void;
  moveElement: (id: string, position: { x: number; y: number }) => void;
  selectElement: (id: string | null) => void;
  getCurrentPage: () => Page | undefined;
}

// Create context
const BuilderContext = createContext<BuilderContextProps | undefined>(undefined);

// Default element templates
const getDefaultElementProps = (type: ElementType, position: { x: number; y: number }): ElementProps => {
  const baseProps = {
    id: uuidv4(),
    type,
    position,
    style: {},
  };

  switch (type) {
    case "text":
      return {
        ...baseProps,
        content: "Edit this text",
        size: { width: "auto", height: "auto" },
        style: {
          color: "#000000",
          fontSize: "16px",
          textAlign: "left",
          padding: "8px",
        },
      };
    case "image":
      return {
        ...baseProps,
        content: "/placeholder.svg",
        size: { width: "200px", height: "150px" },
        style: {
          borderRadius: "4px",
        },
      };
    case "button":
      return {
        ...baseProps,
        content: "Click me",
        size: { width: "120px", height: "40px" },
        style: {
          backgroundColor: "#4F46E5",
          color: "#FFFFFF",
          padding: "8px 16px",
          textAlign: "center",
          borderRadius: "4px",
          fontWeight: "600",
        },
      };
    default:
      return { ...baseProps, content: "", size: { width: "100px", height: "100px" } };
  }
};

// Provider component
export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<Page[]>([
    { id: uuidv4(), name: "Home", elements: [] },
  ]);
  const [currentPageId, setCurrentPageId] = useState<string>(pages[0].id);
  const [selectedElement, setSelectedElement] = useState<ElementProps | null>(null);

  const getCurrentPage = useCallback(() => {
    return pages.find((page) => page.id === currentPageId);
  }, [pages, currentPageId]);

  const addPage = useCallback((name: string) => {
    const newPage = { id: uuidv4(), name, elements: [] };
    setPages((prevPages) => [...prevPages, newPage]);
    setCurrentPageId(newPage.id);
  }, []);

  const addElement = useCallback((type: ElementType) => {
    setPages((prevPages) =>
      prevPages.map((page) => {
        if (page.id === currentPageId) {
          // Position in the center of the canvas
          const position = { x: 100, y: 100 };
          const newElement = getDefaultElementProps(type, position);
          return {
            ...page,
            elements: [...page.elements, newElement],
          };
        }
        return page;
      })
    );
  }, [currentPageId]);

  const updateElement = useCallback((id: string, updates: Partial<ElementProps>) => {
    setPages((prevPages) =>
      prevPages.map((page) => {
        if (page.id === currentPageId) {
          return {
            ...page,
            elements: page.elements.map((element) =>
              element.id === id ? { ...element, ...updates } : element
            ),
          };
        }
        return page;
      })
    );

    // Update selected element if it's currently selected
    if (selectedElement?.id === id) {
      setSelectedElement((prev) => (prev ? { ...prev, ...updates } : null));
    }
  }, [currentPageId, selectedElement]);

  const moveElement = useCallback((id: string, position: { x: number; y: number }) => {
    updateElement(id, { position });
  }, [updateElement]);

  const selectElement = useCallback((id: string | null) => {
    if (!id) {
      setSelectedElement(null);
      return;
    }

    const currentPage = getCurrentPage();
    if (!currentPage) return;

    const element = currentPage.elements.find((el) => el.id === id);
    if (element) {
      setSelectedElement(element);
    }
  }, [getCurrentPage]);

  return (
    <BuilderContext.Provider
      value={{
        pages,
        currentPageId,
        selectedElement,
        addPage,
        addElement,
        updateElement,
        moveElement,
        selectElement,
        getCurrentPage,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

// Custom hook to use builder context
export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
};
