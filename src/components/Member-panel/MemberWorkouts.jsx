import React from 'react';
import '../styles/MemberWorkouts.css';

const workoutData = [
  { day: 'Day 1', title: 'Chest & Triceps', emoji: '💪' },
  { day: 'Day 2', title: 'Back & Biceps', emoji: '🏋️' },
  { day: 'Day 3', title: 'Legs & Abs', emoji: '🦵' },
  { day: 'Day 4', title: 'Cardio + Stretching', emoji: '🏃‍♂️' },
];

const MemberWorkouts = () => {
  return (
    <div className="workout-page">
      <h2 className="workout-title">💼 My Workouts</h2>
      <p className="workout-subtitle">Here are your personalized workout plans:</p>
      <div className="workout-grid">
        {workoutData.map((workout, index) => (
          <div key={index} className="workout-card">
            <div className="workout-emoji">{workout.emoji}</div>
            <h3 className="workout-day">{workout.day}</h3>
            <p className="workout-name">{workout.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberWorkouts;
