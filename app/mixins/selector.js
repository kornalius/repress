const Selectable = require('./selectable')

module.exports = Mixin(superclass => class Selector extends superclass {

  constructor () {
    super(...arguments)

    this._selectables = []
  }

  hasSelectable (obj) {
    return _.includes(this._selectables, obj)
  }

  addSelectable (obj) {
    if (_.isArray(obj)) {
      _.each(obj, this.addSelectable.bind(this))
    }
    else if (obj instanceof Selectable && !this.hasSelectable(obj)) {
      this._selectables.push(obj)
      obj._selector = this
    }
    return this
  }

  removeSelectable (obj) {
    if (_.isArray(obj)) {
      _.each(obj, this.removeSelectable.bind(this))
    }
    else if (obj instanceof Selectable) {
      _.pull(this._selectables, obj)
      obj._selector = undefined
    }
    return this
  }

  canSelect (obj) {
    if (_.isArray(obj)) {
      for (let s of obj) {
        if (s instanceof Selectable && !s.canSelect) {
          return false
        }
      }
      return true
    }
    return !this.disabled && this.hasSelectable(obj) && obj instanceof Selectable && obj.canSelect
  }

  isSelected (obj) {
    if (_.isArray(obj)) {
      for (let s of obj) {
        if (!s.selected) {
          return false
        }
      }
      return true
    }
    return obj instanceof Selectable && obj.selected
  }

  select (obj) {
    if (_.isArray(obj)) {
      _.each(obj, this.select.bind(this))
    }
    else if (this.canSelect(obj)) {
      obj.selected = true
    }
    return this
  }

  unselect (obj) {
    if (_.isArray(obj)) {
      _.each(obj, this.unselect.bind(this))
    }
    else if (this.canSelect(obj)) {
      obj.selected = false
    }
    return this
  }

  toggleSelect (obj) {
    if (_.isArray(obj)) {
      _.each(obj, this.toggleSelect.bind(this))
    }
    else if (this.canSelect(obj)) {
      obj.toggleSelect()
    }
    return this
  }

})
