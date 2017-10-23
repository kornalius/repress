module.exports = Mixin(superclass => class Status extends superclass {

  constructor () {
    super(...arguments)

    this._validStatuses = []
    this._status = undefined
  }

  get status () { return this._status }
  set status (value) {
    if (!this.isStatus(value) && this.isValidStatus(value)) {
      let old = this._status
      this._status = value
      this.emit('status', value, old)
    }
  }

  isValidStatus (name) {
    return !_.isUndefined(_.find(this._validStatuses, name))
  }

  addValidStatus (name) {
    if (_.isArray(name)) {
      for (let n of name) {
        this.addValidStatus(n)
      }
    }
    else if (!this.isValidStatus(name)) {
      this._validStatuses.push(name)
    }
    return this
  }

  removeValidStatus (name) {
    if (_.isArray(name)) {
      for (let n of name) {
        this.removeValidStatus(n)
      }
    }
    else if (this.isValidStatus(name)) {
      _.pull(this._validStatuses, name)
    }
    return this
  }

  isStatus (name) {
    return this._status === name
  }

})
