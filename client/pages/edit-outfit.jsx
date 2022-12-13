import React from 'react';
import Navbar from '../components/navbar';
import OutfitForm from '../components/outfit-form';
import { AppContext } from '../lib';

export default class EditOutfitPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { outfitId: this.props.outfitId };
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <h1 className="heading cookie">Edit Outfit</h1>
          <OutfitForm outfitId={this.state.outfitId} />
        </div>
      </div>
    );
  }
}

EditOutfitPage.contextType = AppContext;
