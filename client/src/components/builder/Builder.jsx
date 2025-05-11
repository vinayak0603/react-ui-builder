import { BuilderProvider } from "@/contexts/BuilderContext";
import ElementsPanel from "./ElementsPanel";
import Canvas from "./Canvas";
import PropertiesPanel from "./PropertiesPanel";
import PageControls from "./PageControls";
import PageTabs from "./PageTabs";
import ExportCodeButton from "./ExportCodeButton";

const Builder = () => {
  return (
    <BuilderProvider>
      <div className="h-screen flex flex-col">
        <div className="bg-white border-b border-builder-border p-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Website Builder</h1>
          <div className="flex items-center gap-2">
            <ExportCodeButton />
            <a href="#preview" className="text-blue-600 hover:underline text-sm">
              Preview
            </a>
          </div>
        </div>
        
        <PageTabs />
        
        <div className="flex-1 flex overflow-hidden">
          <div className="w-64 flex-shrink-0">
            <ElementsPanel />
          </div>
          
          <div className="flex-1 overflow-hidden relative">
            <Canvas />
          </div>
          
          <div className="w-72 flex-shrink-0">
            <PropertiesPanel />
          </div>
        </div>
        
        <PageControls />
      </div>
    </BuilderProvider>
  );
};

export default Builder;
