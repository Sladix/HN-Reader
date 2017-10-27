'use babel';

import HNReaderView from './hnreader-view';
import { CompositeDisposable } from 'atom';

const HNReader = {
  hnreaderView:null,
  panel:null,
  subscriptions:null,
  activate(state){
    this.hnreaderView = new HNReaderView(state.hnreaderViewState);
    console.log("ok");
    this.panel = atom.workspace.addRightPanel({
      item: this.hnreaderView.getElement(),
      visible: false
    });

    this.subscriptions = new CompositeDisposable;

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'hnreader:toggle': this.toggle.bind(this),
      }),
      this.panel.onDidChangeVisible(this.onDidChangeVisible.bind(this))
    );

    atom.emitter.on('hnreader:close',this.close.bind(this));
  },

  // Item is the active pane item, a TextEditor Instance
  // https://atom.io/docs/api/v1.21.1/TextEditor

  deactivate(){
    this.panel.destroy();
    this.subscriptions.dispose();
    return this.hnreaderView.destroy();
  },

  serialize() {
    return {
      hnreaderViewState: this.hnreaderView.serialize(),
    };
  },

  close() {
    return this.panel.hide();
  },

  toggle() {
    if (this.panel.isVisible()) {
      this.close();
    } else {
      this.panel.show();
      atom.emitter.emit('hnreader:show');
      return true;
    }
  },

  onDidChangeVisible(visible) {
    this.hnreaderView.toggle(visible);
  },
}

export default HNReader;
