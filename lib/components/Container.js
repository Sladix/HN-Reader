'use babel';

import React from 'react';
import Timer from './Timer'
import HNList from './HNList'

class Container extends React.Component {

  constructor(){
    super();
    this.state = {};
  }

  render(){
    const {props} = this;
    return(
      <div id="hubert">
        <div className='padded'>
          <div className='inset-panel'>
            <div className='panel-heading'>
              HN Reader
            </div>
            <div className='panel-body'>
              <p><span class="icon icon-watch"></span> Started <Timer start={props.startTime} /> ago</p>
              <h4>Latest Hacker News :</h4>
              <HNList />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Container;
