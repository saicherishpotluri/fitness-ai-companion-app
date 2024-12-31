import React from "react";
import "./Home.css";
import img1 from "../assets/danielle-cerullo-CQfNt66ttZM-unsplash.jpg";
import img2 from "../assets/victor-freitas-vqDAUejnwKw-unsplash.jpg";

function Home() {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="hero">
        <h1>Welcome to Bheem Gym Corp</h1>
        <p>Transform Your Life Today!</p>
      </header>

      {/* Body Section */}
      <main className="body">
        {/* Image Gallery Section */}
        <div className="gallery">
          <h2>Our Gallery</h2>
          <div className="gallery-images">
            <img src={img1} alt="Motivational Image 1" />
            <img src={img2} alt="Motivational Image 2" />
          </div>
        </div>

        {/* Welcome Text Section */}
        <div className="welcome-text">
          <p>
            Want to change the way you live? Want to let go of procrastination?
            Want to live life the way you want? You are at the right place!
            Welcome to Bheem Gym Corp - a one-stop shop for all your fitness
            needs powered by mystique, AI, and proven methods.
          </p>
        </div>
        {/* Testimonials Section */}
        <div className="testimonials">
          <h2>Testimonials</h2>
          <div className="testimonials-scroll">
            <div className="testimonial-item">
              <p>
                "This app changed my life! I feel more motivated every day."
              </p>
              <span>- John Doe</span>
            </div>
            <div className="testimonial-item">
              <p>
                "The AI-powered features are simply amazing. Highly recommend!"
              </p>
              <span>- Sarah Smith</span>
            </div>
            <div className="testimonial-item">
              <p>"I lost 10 pounds in 2 months using their fitness plans."</p>
              <span>- Alex Johnson</span>
            </div>
            <div className="testimonial-item">
              <p>"The community and resources are top-notch."</p>
              <span>- Emily Davis</span>
            </div>
            <div className="testimonial-item">
              <p>"Super easy to use and very effective."</p>
              <span>- Michael Brown</span>
            </div>
          </div>
        </div>
      </main>
      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Bheem Gym Corp. All rights reserved.</p>
          <p>
            <a href="/privacy-policy" className="footer-link">
              Privacy Policy
            </a>{" "}
            |
            <a href="/terms-of-service" className="footer-link">
              {" "}
              Terms of Service
            </a>{" "}
            |
            <a href="/contact-us" className="footer-link">
              {" "}
              Contact Us
            </a>
          </p>
          <p>
            Follow us on:
            <a
              href="https://facebook.com"
              target="_blank"
              className="footer-link"
            >
              {" "}
              Facebook
            </a>{" "}
            |
            <a
              href="https://twitter.com"
              target="_blank"
              className="footer-link"
            >
              {" "}
              Twitter
            </a>{" "}
            |
            <a
              href="https://instagram.com"
              target="_blank"
              className="footer-link"
            >
              {" "}
              Instagram
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
