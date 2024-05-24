// Application UI Container & Navigation 
import "./styles/App.css"
import logo from "./assets/jigsaw.png"
import React, { useState } from "react";
import Homepage from "./components/Home";
import ContactUs from "./components/Contact";
import TextSummary from "./components/TextSummary"
import ImageAnalyser from "./components/ImageAnalyser";

type SwitchMap = {
  [key: string]: React.ElementType;
};

const switchMap: SwitchMap = {
  "Home": () => <Homepage />, 
  "Text Summary": () => <TextSummary />,
  "Image Analyser": () => <ImageAnalyser />,
  "Contact" : () => <ContactUs />,
  };

function App() {
  const [selectedComponent, setSelectedComponent] = useState("Home");
  const ActiveComponent = switchMap[selectedComponent];

  return (
    <>
      <div className="app-logo">
        <img onClick={() => setSelectedComponent("Home")} className="logo" src={logo}></img>
      </div>
      
      <div className="app-control">
        {Object.keys(switchMap).map((componentKey) => (
          <button
            key={componentKey}
            className={`app-control-button ${componentKey === selectedComponent ? "app-control-button-selected" : "app-control-button"}`}
            onClick={() => setSelectedComponent(componentKey)}
          >
            {componentKey}
          </button>
        ))}
      </div>

      <div className="app-element">
        <ActiveComponent />
      </div>
      
    </>
  )
}

export default App
