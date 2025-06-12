import React from 'react';
import '../styles/MemberWorkouts.css';

const workoutData = [
  { day: 'Day 1', title: 'Chest & Triceps' },
  { day: 'Day 2', title: 'Back & Biceps' },
  { day: 'Day 3', title: 'Legs & Abs' },
  { day: 'Day 4', title: 'Cardio + Stretching' },
];

const MemberWorkouts = () => {
  return (
    <div className="workout-page">
      <h2 className="workout-title">My Workouts</h2>
      <p className="workout-subtitle">Here are your personalized workout plans:</p>
      <div className="workout-grid">
        {workoutData.map((workout, index) => (
          <div key={index} className="workout-card">
            <h3 className="workout-day">{workout.day}</h3>
            <p className="workout-name">{workout.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberWorkouts;
