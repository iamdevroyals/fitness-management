import React from 'react';
import '../styles/MemberClasses.css';

const classData = [
  {
    title: 'Yoga',
    schedule: 'Mon/Wed/Fri at 7 AM',
    instructor: 'Ms. Priya Sharma',
    duration: '45 mins',
    status: 'Active'
  },
  {
    title: 'Strength Training',
    schedule: 'Tue/Thu at 6 PM',
    instructor: 'Mr. Rakesh Singh',
    duration: '60 mins',
    status: 'Active'
  },
  {
    title: 'Cardio Blast',
    schedule: 'Saturday at 8 AM',
    instructor: 'Ms. Anjali Mehta',
    duration: '40 mins',
    status: 'Upcoming'
  }
];

const MemberClasses = () => {
  return (
    <div className="member-classes">
      <h2 className="classes-title">My Classes</h2>
      <p className="classes-subtitle">Here are your currently enrolled sessions:</p>
      <div className="classes-grid">
        {classData.map((cls, index) => (
          <div className="class-card" key={index}>
            <h3 className="class-title">{cls.title}</h3>
            <p><strong>Schedule:</strong> {cls.schedule}</p>
            <p><strong>Instructor:</strong> {cls.instructor}</p>
            <p><strong>Duration:</strong> {cls.duration}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`status ${cls.status.toLowerCase()}`}>{cls.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberClasses;
