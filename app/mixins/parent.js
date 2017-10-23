/**
 * @module mixins
 */

module.exports = Mixin(superclass => class Parent extends superclass {

  constructor () {
    super(...arguments)

    this._parent = undefined
  }

  get parent () { return this._parent }
  set parent (value) {
    if (value !== this._parent) {
      let old = this._parent
      this._parent = value
      this.emit('parent', value, old)
    }
  }

  get hasParent () { return !_.isUndefined(this._parent) }

  get root () {
    let p = this
    while (p) {
      if (!p.hasParent) {
        return p
      }
      p = p.parent
    }
    return undefined
  }

})
