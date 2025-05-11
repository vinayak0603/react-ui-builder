
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useBuilder } from "@/contexts/BuilderContext";

const PageControls = () => {
  const { addPage, pages, currentPageId } = useBuilder();
  const [isOpen, setIsOpen] = useState(false);
  const [newPageName, setNewPageName] = useState("");

  const handleAddPage = () => {
    if (newPageName.trim()) {
      addPage(newPageName.trim());
      setNewPageName("");
      setIsOpen(false);
    }
  };

  return (
    <div className="p-4 border-t border-builder-border flex justify-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mx-auto">
            Add Page +
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Page</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Page Name"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPage}>Add Page</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageControls;
