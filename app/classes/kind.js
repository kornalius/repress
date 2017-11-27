const Base = require('./base')

class Kind extends Base {

  constructor (world, name, kind) {
    super()

    this._world = world
    this.name = name
    this.kind = kind
    this._validProps = []
    this._items = []
  }

  inheritsFrom (name) {
    return this.kind === _.get(this._world.kind(name), 'name')
  }

  get world () { return this._world }

  get name () { return this._name }
  set name (value) {
    this._name = value.toLowerCase()
  }

  get kind () { return this._kind }
  set kind (value) {
    this._kind = name.toLowerCase()
  }

  get validProps () {
    let validProps = []
    let k = this._world.kind(this._kind)
    if (k) {
      validProps = _.concat(validProps, k.validProps)
    }
    return _.concat(validProps, this._validProps)
  }

  get items () {
    let items = []
    let k = this._world.kind(this._kind)
    if (k) {
      items = _.concat(items, k.items)
    }
    return _.concat(items, this._items)
  }

  getThing (thing) {
    return _.find(this.items, _.isString(thing) ? { _name: thing } : thing)
  }

  addThing (thing) {
    if (!this.getThing(thing)) {
      this._items.push()
    }
  }

}

module.exports = Kind
