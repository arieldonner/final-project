import React from 'react';
import HelloWorld from '../components/hello-world';
import Navbar from '../components/navbar';

export default function Home(props) {
  return (
    <div>
      <Navbar />
      <HelloWorld />
    </div>
  );
}
