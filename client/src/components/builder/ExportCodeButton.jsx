//import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useBuilder } from "@/contexts/BuilderContext";
import { Button } from "@/components/ui/button";

const ExportCodeButton = () => {
  const { pages } = useBuilder();

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
    `.trim();
  };

  const generateHTML = (page) => {
    const navbar = generateNavbarHTML(page.name);
    const elementsHtml = page.elements
      .map((element) => {
        const style = Object.entries(element.style || {})
          .map(([key, value]) => `${key}: ${value}`)
          .join("; ");
        switch (element.type) {
          case "text":
            return `<div style="${style}; position: absolute; left: ${element.position.x}px; top: ${element.position.y}px;">${element.content}</div>`;
          case "image":
            return `<img src="${element.content}" style="${style}; width: ${element.size.width}; height: ${element.size.height}; position: absolute; left: ${element.position.x}px; top: ${element.position.y}px;" />`;
          case "button":
            return `<button style="${style}; width: ${element.size.width}; height: ${element.size.height}; position: absolute; left: ${element.position.x}px; top: ${element.position.y}px;">${element.content}</button>`;
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
  ${elementsHtml}
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
