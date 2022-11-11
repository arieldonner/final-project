import React from 'react';
import Navbar from '../components/navbar';
import CalendarPage from '../components/calendar';

export default function Home(props) {
  return (
    <div>
      <Navbar />
      <CalendarPage />
    </div>
  );
}
