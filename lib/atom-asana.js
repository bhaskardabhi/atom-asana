'use babel';

import AtomAsanaView from './atom-asana-view';
import { CompositeDisposable } from 'atom';

export default {

  atomAsanaView: null,
  modalPanel: null,
  subscriptions: null,

  config: {
     key: {
         title: 'Asana key',
         description: 'Enter your asana key here',
         type: 'string',
         default: ''
     }
   },


  activate(state) {
    this.atomAsanaView = new AtomAsanaView(state.atomAsanaViewState);
    this.modalPanel = atom.workspace.addBottomPanel({
      item: this.atomAsanaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-asana:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomAsanaView.destroy();
  },

  serialize() {
    return {
      atomAsanaViewState: this.atomAsanaView.serialize()
    };
  },

  toggle() {
    console.log('AtomAsana was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
