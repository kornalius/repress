module.exports = superclass => class extends superclass {

  static get properties () {
    return {
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: '_disabledChanged',
      },
    }
  }

  _disabledChanged (newValue) {
  }

}
