import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useBuilder } from "@/contexts/BuilderContext";
import { Button } from "@/components/ui/button";

const ExportCodeButton = () => {
  const { pages } = useBuilder();
  const CANVAS_WIDTH = 1024;
  const CANVAS_HEIGHT = 600;

  const generateNavbarHTML = (currentPageName) => {
    return `
<header class="navbar">
  <div class="navbar-left">Vinayak</div>
  <nav class="navbar-right">
    ${pages
      .map(
        (page) => `
        <a 
          href="../${page.name}/index.html" 
          class="nav-link ${page.name === currentPageName ? "active" : ""}"
        >
          ${page.name}
        </a>
      `
      )
      .join("")}
  </nav>
</header>
<div class="navbar-space"></div>
    `.trim();
  };

  const generateCSS = () => {
    return `
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  z-index: 999;
  flex-wrap: wrap;
}

.navbar-left {
  font-size: 1.2rem;
  font-weight: bold;
  color: #4F46E5;
}

.navbar-right {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.nav-link {
  text-decoration: none;
  color: #4F46E5;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: #e0e7ff;
}

.nav-link.active {
  background-color: #4F46E5;
  color: white;
}

.navbar-space {
  height: 60px;
}

.output-canvas {
  position: relative;
  width: 100%;
  height: 100vh; /* instead of calc(100vh - 60px) */
  background-color: #f3f4f6;
  overflow: hidden;
}

    `.trim();
  };

  const generateHTML = (page) => {
    const navbar = generateNavbarHTML(page.name);
    const elementsHtml = page.elements
      .map((element) => {
        const styleEntries = Object.entries(element.style || {});
        const style = styleEntries.map(([key, value]) => `${key}: ${value}`).join("; ");

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
          ${percentWidth !== null ? `width: ${percentWidth}%;` : ""}
          ${percentHeight !== null ? `height: ${percentHeight}%;` : ""}
        `;

        switch (element.type) {
          case "text":
            return `<div style="${style}; ${positionStyles}">${element.content}</div>`;
          case "image":
            return `<img src="${element.content}" style="${style}; ${positionStyles}" />`;
          case "button":
            return `<button style="${style}; ${positionStyles}">${element.content}</button>`;
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
  <title>${page.name}</title>
  <link rel="stylesheet" href="styles.css" />
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

  const downloadZip = async () => {
    const zip = new JSZip();

    pages.forEach((page) => {
      const folder = zip.folder(page.name);
      if (folder) {
        folder.file("index.html", generateHTML(page));
        folder.file("styles.css", generateCSS());
      }
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "exported-site.zip");
  };

  return (
    <Button onClick={downloadZip} className="mt-4">
      Download Code
    </Button>
  );
};

export default ExportCodeButton;
