
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBuilder } from "@/contexts/BuilderContext";

const PageTabs = () => {
  const { pages, currentPageId, setCurrentPage } = useBuilder();

  const handleTabChange = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="bg-white border-b border-builder-border p-2">
      <Tabs value={currentPageId} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full justify-start">
          {pages.map((page) => (
            <TabsTrigger key={page.id} value={page.id} className="px-4">
              {page.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default PageTabs;
