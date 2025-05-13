import React, { createContext, useContext, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

// Create context
const BuilderContext = createContext(undefined);

// Default element templates
const getDefaultElementProps = (type, position) => {
  const baseProps = {
    id: uuidv4(),
    type,
    position: position || { x: 100, y: 100 },
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
      return {
        ...baseProps,
        content: "",
        size: { width: "100px", height: "100px" },
      };
  }
};

// Provider component
export const BuilderProvider = ({ children }) => {
  const [pages, setPages] = useState([
    { id: uuidv4(), name: "Home", elements: [] },
  ]);
  const [currentPageId, setCurrentPageId] = useState(pages[0].id);
  const [selectedElement, setSelectedElement] = useState(null);

  const getCurrentPage = useCallback(() => {
    return pages.find((page) => page.id === currentPageId);
  }, [pages, currentPageId]);

  const addPage = useCallback((name) => {
    const newPage = { id: uuidv4(), name, elements: [] };
    setPages((prevPages) => [...prevPages, newPage]);
    setCurrentPageId(newPage.id);
  }, []);

  // 🔥 Updated to accept optional position
  const addElement = useCallback((type, position = { x: 100, y: 100 }) => {
    const newElement = getDefaultElementProps(type, position);

    setPages((prevPages) =>
      prevPages.map((page) => {
        if (page.id === currentPageId) {
          return {
            ...page,
            elements: [...page.elements, newElement],
          };
        }
        return page;
      })
    );
  }, [currentPageId]);

  const updateElement = useCallback(
    (id, updates) => {
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

      if (selectedElement?.id === id) {
        setSelectedElement((prev) => (prev ? { ...prev, ...updates } : null));
      }
    },
    [currentPageId, selectedElement]
  );

  const moveElement = useCallback(
    (id, position) => {
      updateElement(id, { position });
    },
    [updateElement]
  );

  const selectElement = useCallback(
    (id) => {
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
    },
    [getCurrentPage]
  );

  const deleteElement = useCallback(
    (id) => {
      setPages((prevPages) =>
        prevPages.map((page) => {
          if (page.id === currentPageId) {
            return {
              ...page,
              elements: page.elements.filter((element) => element.id !== id),
            };
          }
          return page;
        })
      );

      if (selectedElement?.id === id) {
        setSelectedElement(null);
      }
    },
    [currentPageId, selectedElement]
  );

  const setCurrentPage = useCallback((pageId) => {
    setCurrentPageId(pageId);
    setSelectedElement(null);
  }, []);

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
        deleteElement,
        getCurrentPage,
        setCurrentPage,
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
