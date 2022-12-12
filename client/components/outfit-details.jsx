import React from 'react';
// import NotFound from './not-found';

export default class OutfitDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitName: '',
      startDate: '',
      startTime: '',
      endTime: '',
      locationName: '',
      show: false,
      loading: true,
      error: false
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>Hi</div>
    );
  }
}
