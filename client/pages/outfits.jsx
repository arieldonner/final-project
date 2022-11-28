import React from 'react';
import Navbar from '../components/navbar';
import ViewOutfits from '../components/view-outfits';
import Redirect from '../components/redirect';
import { AppContext } from '../lib';

export default class Outfits extends React.Component {
  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <div>
        <Navbar />
        <ViewOutfits />
      </div>
    );
  }
}

Outfits.contextType = AppContext;
