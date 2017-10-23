const Selector = require('./selector')

module.exports = Mixin(superclass => class Selectable extends superclass {

  constructor () {
    super(...arguments)

    this._selectable = false
    this._selector = undefined
    this._selected = false

    this._selectable_resize = this.selectable_resize.bind(this)

    this.selectable = true
  }

  selectable_resize () {
  }

  get canSelect () { return !this.disabled && !_.isUndefined(this._selector) }

  addToSelector (selector) {
    if (selector instanceof Selector) {
      selector.addSelectable(this)
    }
    return this
  }

  removeFromSelector (selector) {
    if (selector instanceof Selector) {
      selector.removeSelectable(this)
    }
    return this
  }

  get selectable () { return this._selectable }
  set selectable (value) {
    if (value !== this._selectable) {
      this._selectable = value
      this.emit('selectable', value)
    }
  }

  get selected () { return this._selected }
  set selected (value) {
    if (value !== this._selected) {
      this._selected = value
      this.emit('selected', value)
      this.emit(value ? 'select' : 'unselect')
    }
  }

  toggleSelect () {
    this.selected = !this._selected
  }

})
