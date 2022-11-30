import React from 'react';
import Navbar from '../components/navbar';
import OutfitForm from '../components/outfit-form';

export default class CreateOutfitPage extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <h1 className="heading cookie">Create Outfit</h1>
          <OutfitForm />
        </div>
      </div>
    );
  }
}
