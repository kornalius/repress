const Base = require('./base')

class Prop extends Base {

  constructor (world, name, values) {
    super()

    this._world = world
    this.name = name
    this._values = values || {}
  }

  get world () { return this._world }

  get name () { return this._name }
  set name (value) {
    this._name = value.toLowerCase()
  }

  get values () { return this.values }
  set values (value) {
    this._values = value
  }

  isValid (value) {
    return _.includes(this._values, value)
  }

}

module.exports = Prop
