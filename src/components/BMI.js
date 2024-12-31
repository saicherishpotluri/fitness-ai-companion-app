import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiData, setBmiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateBMI = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/create-healthcheck?height=${height}&weight=${weight}`
      );
      const data = await response.text();
      parseBMIResponse(data);
    } catch (error) {
      console.error("Error fetching BMI data:", error);
    } finally {
      setLoading(false);
    }
  };

  const parseBMIResponse = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const bmiData = {
      result: doc.querySelector("p")?.innerHTML || "",
      feedback: doc.querySelector("h2:nth-of-type(1) + p")?.innerHTML || "",
      suggestions: Array.from(doc.querySelectorAll("ul li")).map((li) => li.innerHTML),
    };

    setBmiData(bmiData);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">BMI Calculator</h2>
      <form className="mb-4">
        <div className="row mb-3">
          <label htmlFor="height" className="col-sm-4 col-form-label">
            Height (in cm)
          </label>
          <div className="col-sm-8">
            <input
              type="number"
              className="form-control"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in centimeters"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="weight" className="col-sm-4 col-form-label">
            Weight (in kg)
          </label>
          <div className="col-sm-8">
            <input
              type="number"
              className="form-control"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kilograms"
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={calculateBMI}
        >
          Calculate BMI
        </button>
      </form>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="output mt-4">
        {bmiData ? (
          <div>
            <h3 className="mb-4">
              <strong>BMI Result</strong>
            </h3>
            <p dangerouslySetInnerHTML={{ __html: bmiData.result }}></p>

            <h4 className="mt-4">Health Feedback</h4>
            <p dangerouslySetInnerHTML={{ __html: bmiData.feedback }}></p>

            <h4 className="mt-4">Suggestions for Improvement</h4>
            <ul>
              {bmiData.suggestions.map((suggestion, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: suggestion }}></li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No BMI data generated yet.</p>
        )}
      </div>
    </div>
  );
}

export default BMI;
