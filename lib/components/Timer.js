'use babel';

import React from 'react';

class Timer extends React.Component {

    constructor(){
      super();
      this.state = {
        elapsed : 0
      }
    }

    componentDidMount(){

        // componentDidMount is called by react when the component
        // has been rendered on the page. We can set the interval here:

        this.timer = setInterval(this.tick.bind(this), 500);
    }

    componentWillUnmount(){

        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:

        clearInterval(this.timer);
    }

    tick(){

        // This function is called every 50 ms. It updates the
        // elapsed counter. Calling setState causes the component to be re-rendered

        this.setState({elapsed: new Date() - this.props.start});
    }

    render() {

        // Calculate elapsed to tenth of a second:
        var elapsed = Math.round(this.state.elapsed / 1000);

        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = elapsed % 60;
        var minutes = Math.floor(elapsed / 60) % 60;
        var hours = Math.floor(elapsed / 3600) % 24;

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.

        return (
          <span>
            {hours > 0 &&
              <span>
                {hours}h&nbsp;
              </span>
            }
            {minutes > 0 &&
              <span>
                {minutes}mn&nbsp;
              </span>
            }
            {seconds}s
          </span>
        );
    }
};

export default Timer;
