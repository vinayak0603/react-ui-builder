import { Button } from "@/components/ui/button";
import { useBuilder } from "@/contexts/BuilderContext";

const PreviewLauncher = () => {
  const { pages } = useBuilder();
  const CANVAS_WIDTH = 1024;
  const CANVAS_HEIGHT = 600;

  const generateHTML = () => {
    const currentPage = pages[0]; // or any active page
    const navbar = `
      <header class="navbar">
        <div class="navbar-left">Vinayak</div>
        <nav class="navbar-right">
          ${pages
            .map(
              (page) => `<a href="#">${page.name}</a>`
            )
            .join("")}
        </nav>
      </header>
      <div class="navbar-space"></div>`;

    const elementsHtml = currentPage.elements
      .map((element) => {
        const percentLeft = (element.position.x / CANVAS_WIDTH) * 100;
        const percentTop = (element.position.y / CANVAS_HEIGHT) * 100;
        const percentWidth = element.size?.width
          ? (parseInt(element.size.width) / CANVAS_WIDTH) * 100
          : null;
        const percentHeight = element.size?.height
          ? (parseInt(element.size.height) / CANVAS_HEIGHT) * 100
          : null;

        const positionStyles = `
          position: absolute;
          left: ${percentLeft}%;
          top: ${percentTop}%;
          ${percentWidth ? `width: ${percentWidth}%;` : ""}
          ${percentHeight ? `height: ${percentHeight}%;` : ""}
        `;

        switch (element.type) {
          case "text":
            return `<div style="${positionStyles}">${element.content}</div>`;
          case "image":
            return `<img src="${element.content}" style="${positionStyles}" />`;
          case "button":
            return `<button style="${positionStyles}">${element.content}</button>`;
          default:
            return "";
        }
      })
      .join("\n");

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Preview</title>
  <style>
    body {
      margin: 0;
      font-family: sans-serif;
    }
    .output-canvas {
      position: relative;
      width: 100%;
      height: 100vh;
      background-color: #f3f4f6;
      overflow: hidden;
    }
    .navbar {
      height: 60px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
    }
    .navbar-space {
      height: 60px;
    }
  </style>
</head>
<body>
  ${navbar}
  <div class="output-canvas">
    ${elementsHtml}
  </div>
</body>
</html>
    `.trim();
  };

  const handlePreview = () => {
    const htmlContent = generateHTML();
    const newWindow = window.open();
    newWindow.document.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  };

  return (
    <Button onClick={handlePreview} className="text-sm mt-2">
      Preview in New Tab
    </Button>
  );
};

export default PreviewLauncher;
