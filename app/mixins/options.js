module.exports = superclass => class extends superclass {

  static get properties () {
    return {
      validOptions: {
        type: Array,
        observer: '_validOptionsChanged',
        value: () => [],
      },
      options: {
        type: Array,
        observer: '_optionsChanged',
        value: () => [],
      },
    }
  }

  _optionsChanged (newValue) {
  }

  _validOptionsChanged (newValue) {
  }

  addOption (name) {
    if (_.isArray(name)) {
      for (let n of name) {
        this.addOption(n)
      }
    }
    else if (!this.hasOption(name) && this.isValidOption(name)) {
      this.push('options', name)
    }
  }

  removeOption (name) {
    if (_.isArray(name)) {
      for (let n of name) {
        this.removeOption(n)
      }
    }
    else if (this.hasOption(name)) {
      this.splice('options', _.indexOf(this.options, name), 1)
    }
  }

  setOption (name, value) {
    if (this.hasOption(name) && !value) {
      this.removeOption(name)
      return true
    }
    else if (!this.hasOption(name) && value) {
      this.addOption(name)
      return true
    }
    return false
  }

  toggleOption (name) {
    return this.setOption(name, !this.hasOption(name))
  }

  isValidOption (name) {
    return _.includes(this.validOptions, name)
  }

  addValidOption (name) {
    if (_.isArray(name)) {
      for (let n of name) {
        this.addValidOption(n)
      }
    }
    else if (!this.isValidOption(name)) {
      this.push('validOptions', name)
    }
  }

  removeValidOption (name) {
    if (_.isArray(name)) {
      for (let n of name) {
        this.removeValidOption(n)
      }
    }
    else if (this.isValidOption(name)) {
      this.splice('validOptions', _.indexOf(this.validOptions, name), 1)
    }
  }

  hasOption (name) {
    return this.isValidOption(name) && _.includes(this.options, name)
  }

}
