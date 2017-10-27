'use babel';

import React from 'react';
import ReactDOM from 'react-dom';

import Container from './components/Container';

class HNReaderView{
  constructor(){
    this.element = document.createElement('div')
    this.startTime = Date.now();
    this.panelHashStartTime = {};
    this.state = {

    }
  }

  getElement() {
    return this.element;
  }

  shutDownReact() {
    this.state = {
      items: [],
      loading: true,
      pathsSearched: 0,
    };
    ReactDOM.unmountComponentAtNode(this.element);
  }

  setState(state) {
    Object.assign(this.state, state);
    this._render();
  }

  _render(){
    const {state} = this;

    ReactDOM.render(
      <Container
        startTime={this.startTime}
      />,
      this.element
    );
  }

  serialize() {}

  destroy() {
    ReactDOM.unmountComponentAtNode(this.element);
    return this.element.remove();
  }

  toggle(visible){
    return visible
    ? this._render()
    : this.shutDownReact();
  }
}

export default HNReaderView;
