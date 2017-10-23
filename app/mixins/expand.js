module.exports = Mixin(superclass => class Expand extends superclass {

  constructor () {
    super(...arguments)

    this._expandable = true
    this._expanded = false
  }

  get expandable () { return this._expandable }
  set expandable (value) {
    if (value !== this._expandable) {
      this._expandable = value
      this.emit('expandable', value)
    }
  }

  get expanded () { return this._expanded }
  set expanded (value) {
    if (value !== this._expanded) {
      this._expanded = value
      this.emit('expanded', value)
      this.emit(value ? 'expand' : 'collapse')
    }
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

})
