module.exports = Mixin(superclass => class List extends superclass {

  constructor () {
    super(...arguments)

    this._items = []
  }

  get items () { return this._items }

  instancesOf (type) {
    let instances = []
    for (let i of this._items) {
      if (i instanceof type) {
        instances.push(i)
      }
    }
    return instances
  }

  find (...args) {
    return _.find(this._items, ...args)
  }

  findById (id) {
    return this.find({ _id: id })
  }

  findByName (name) {
    return this.find({ name })
  }

  add (value) {
    if (!this.has(value)) {
      this._items.push(value)
      return this._items.length - 1
    }
    return -1
  }

  remove (value) {
    let i = _.isNumber(value) ? value : this.indexOf(value)
    if (i !== -1) {
      _.splice(this._items, i, 1)
    }
    return i
  }

  destroy () {
    if (this._parent && !_.isEmpty(this._name)) {
      delete this._parent._keys[this._name]
    }
  }

  has (value) {
    return _.includes(this._items, value)
  }

  clear () {
    this._items = []
    return this
  }

  get length () {
    return this._items.length
  }

  filter (...args) {
    return _.filter(this._items, ...args)
  }

  map (...args) {
    return _.map(this._items, ...args)
  }

  omit (...args) {
    return _.omit(this._items, ...args)
  }

  indexOf (...args) {
    return _.indexOf(this._items, ...args)
  }

  at (idx) {
    return _.nth(this._items, idx)
  }

  each (cb) {
    _.each(this._items, cb)
  }

})
