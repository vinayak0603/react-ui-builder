//import Builder from './components/builder/Builder';
import Builder from "../components/builder/Builder";

//import Builder from "@/components/builder/Builder";
import { toast } from "sonner";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    toast("Welcome to the Website Builder", {
      description: "Drag elements from the left panel to the canvas",
      duration: 5000,
    });
  }, []);

  return <Builder />;
};

export default Index;
