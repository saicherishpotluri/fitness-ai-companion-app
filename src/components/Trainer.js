import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Trainer() {
  const [targetMuscle, setTargetMuscle] = useState("");
  const [injury, setInjury] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [exercisePlan, setExercisePlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const createExercisePlan = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/create-exercise?targetMuscle=${targetMuscle}&injury=${injury}&restrictions=${restrictions}`
      );
      const data = await response.text();
      parseExercisePlan(data);
    } catch (error) {
      console.error("Error fetching exercise plan: ", error);
    } finally {
      setLoading(false);
    }
  };

  const parseExercisePlan = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const exercises = Array.from(doc.querySelectorAll("h2")).map((title) => {
      const description = title.nextElementSibling?.textContent || "";
      const targetMuscle = title.nextElementSibling?.nextElementSibling?.textContent || "";
      const setsReps = title.nextElementSibling?.nextElementSibling?.nextElementSibling?.textContent || "";
      const videoLink = title.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling?.href || "";
      const precautions = Array.from(
        title.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling?.querySelectorAll("li")
      ).map((li) => li.textContent);

      return {
        title: title.textContent,
        description,
        targetMuscle,
        setsReps,
        videoLink,
        precautions,
      };
    });

    setExercisePlan(exercises);
  };

  const getYouTubeEmbedURL = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?controls=1`;
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Personalized Exercise Planner</h2>
      <form className="mb-4">
        <div className="row mb-3">
          <label htmlFor="targetMuscle" className="col-sm-4 col-form-label">
            Target Muscle
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="targetMuscle"
              value={targetMuscle}
              onChange={(e) => setTargetMuscle(e.target.value)}
              placeholder="Enter the target muscle group"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="injury" className="col-sm-4 col-form-label">
            Injury
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="injury"
              value={injury}
              onChange={(e) => setInjury(e.target.value)}
              placeholder="Enter any injury details"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="restrictions" className="col-sm-4 col-form-label">
            Restrictions
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="restrictions"
              value={restrictions}
              onChange={(e) => setRestrictions(e.target.value)}
              placeholder="Enter any restrictions"
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={createExercisePlan}
        >
          Get Exercise Plan
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
        {exercisePlan ? (
          <div>
            {exercisePlan.map((exercise, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <h4 className="card-title">{exercise.title}</h4>
                  <p><strong>Description:</strong> {exercise.description}</p>
                  <p><strong>Target Muscle:</strong> {exercise.targetMuscle}</p>
                  <p><strong>Sets and Reps:</strong> {exercise.setsReps}</p>
                  <iframe
                    width="100%"
                    height="315"
                    src={getYouTubeEmbedURL(exercise.videoLink)}
                    title={`Video for ${exercise.title}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <h5 className="mt-3">Precautions:</h5>
                  <ul>
                    {exercise.precautions.map((precaution, i) => (
                      <li key={i}>{precaution}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No exercise plan generated yet.</p>
        )}
      </div>
    </div>
  );
}

export default Trainer;
