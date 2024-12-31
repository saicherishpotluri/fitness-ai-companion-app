import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import ImageGenerator from "./components/ImageGenerator";
import Chat from "./components/Chat";
import RecipeGenerator from "./components/RecipeGenerator";
import Home from "./components/Home";
import logo from "./assets/ezgif-4-d77c5f6b87-removebg-preview.png";

function App() {
  const [activeTab, setActiveTab] = useState("home"); // Default to "home"

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* Logo Section */}
          <Navbar.Brand onClick={() => handleTabChange("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <img 
              src={logo} 
              alt="Bheem Gym Corp Logo" 
              style={{ height: "40px", marginRight: "10px" }} 
            />
            Bheem Gym Corp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => handleTabChange("chat")}>
                Chat
              </Nav.Link>
              <Nav.Link onClick={() => handleTabChange("image-generator")}>
                Image Generator
              </Nav.Link>
              <Nav.Link onClick={() => handleTabChange("recipe-generator")}>
                Nutritionist
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Content Section */}
      <div className="content-section">
        {activeTab === "home" && <Home />}
        {activeTab === "image-generator" && <ImageGenerator />}
        {activeTab === "chat" && <Chat />}
        {activeTab === "recipe-generator" && <RecipeGenerator />}
      </div>
    </div>
  );
}

export default App;
