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
        <div className="bg-white border-b border-builder-border p-1 flex justify-between items-center">
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
  {/* Reduce the left panel width */}
  <div className="w-52 flex-shrink-0">
    <ElementsPanel />
  </div>

  {/* Expand the canvas container */}
  <div className="flex-1 overflow-hidden relative">
    <Canvas />
  </div>

  {/* Reduce the right panel width */}
  <div className="w-60 flex-shrink-0">
    <PropertiesPanel />
  </div>
</div>

        
        <PageControls />
      </div>
    </BuilderProvider>
  );
};

export default Builder;
