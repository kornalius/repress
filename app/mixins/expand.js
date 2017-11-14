module.exports = superclass => class extends superclass {

  static get properties () {
    return {
      expandable: {
        type: Boolean,
        value: false,
      },
      expanded: {
        type: Boolean,
        value: false,
        observer: '_expandedChanged',
      },
    }
  }

  _expandedChanged (newValue) {
  }

  expand () {
    this.expanded = true
  }

  collapse () {
    this.expanded = false
  }

  toggleExpand () {
    this.expanded = !this.expanded
  }

}
