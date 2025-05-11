
# 🧩 React UI Builder

A fully responsive drag-and-drop UI builder built using **React.js**. It enables users to design custom interfaces by dragging components onto a canvas, customizing their properties, and exporting production-ready HTML, CSS, and JS code. A responsive navbar is automatically included in the exported files.

---

## 🔧 Project Architecture

This project follows a **component-based architecture**, where the UI is split into isolated, reusable pieces (like Canvas, ElementsPanel, PropertiesPanel, etc.). The **Context API** is used to manage global state across the builder — handling components added to the canvas, selected properties, and export logic.

---

## ⚙️ Tools & Technologies

- **React.js** – Component-based frontend library.
- **Tailwind CSS / Custom CSS** – For responsive, modern styling.
- **Context API** – For global state management.
- **JavaScript (ES6)** – For application logic.
- **FileSaver.js / Blob API** – To handle exporting downloadable code files.
- **Custom Hooks** – For utilities like screen detection and toast notifications.

---

## 🚀 Features

- 🧲 **Drag-and-Drop Interface**
- 🖥️ **Responsive Canvas with Live Preview**
- 💼 **Component Properties Customization**
- 📤 **Export Clean HTML, CSS, and JS**
- 🧭 **Auto-Included Responsive Navbar**
- 📄 **Multi-Page Tab Support**
- 🔔 **Toast Notifications on Actions**

---

## 📁 Project Structure

```
src/
│
├── components/
│   └── builder/
│       ├── Builder.jsx             # Main layout controller
│       ├── Canvas.jsx              # Drop zone for elements
│       ├── CanvasElement.jsx       # Rendered component in canvas
│       ├── ElementsPanel.jsx       # Sidebar to select elements
│       ├── ExportCodeButton.jsx    # Exports current UI as code
│       ├── PageControls.jsx        # Controls like Add/Delete page
│       ├── PageTabs.jsx            # Navigation tabs for pages
│       ├── PropertiesPanel.jsx     # Right sidebar for editing props
│       └── ui/                     # Common styled UI components
│
├── contexts/
│   ├── BuilderContext.jsx          # Context for global state
│   └── BuilderContext.tsx          # (Optional TypeScript version)
│
├── hooks/
│   ├── use-mobile.jsx              # Detects screen size
│   └── use-toast.js                # Manages toast notifications
│
├── lib/
│   └── utils.js                    # Helper functions
│
├── pages/
│   ├── Index.jsx                   # Landing/entry page
│   └── NotFound.jsx                # 404 fallback
│
├── App.jsx                         # Root component
└── App.css                         # Global styles
```

---

## 📹 Demo Video

🎬 **Watch the walkthrough video of the project:**  
👉 [Click here to watch](https://your-video-link.com)  
---

## 🖥️ Getting Started

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/vinayak0603/react-ui-builder.git

# Navigate into the project directory
cd react-ui-builder

# Install dependencies
npm install

# Run the development server
npm start
```
---



This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute with proper attribution.

---

## 🙋‍♂️ Author

**Your Name**  
💬 [LinkedIn](https://linkedin.com/in/vinayak-andhere-3067a7247) | [Instagram](https://www.instagram.com/iv_inayak_6?igsh=MTZqdGpmeW84OGVxYg==) | [GitHub](https://github.com/vinayak0603)

---
## Live Link

https://website-builder.netlify.app/

---