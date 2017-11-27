const Kind = require('./kind')

class Item extends Kind {

  constructor (world, name, kind) {
    super(world, name, kind)

    this._props = []
  }

  hasProp (name) {
    return _.includes(this._props, name.toLowerCase())
  }

  setProp (name) {
    name = name.toLowerCase()
    if (!this.hasProp(name)) {
      this._props.push(name)
    }
  }

}

module.exports = Item
