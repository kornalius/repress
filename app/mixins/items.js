module.exports = superclass => class extends superclass {

  static get properties () {
    return {
      items: {
        type: Array,
        observer: '_itemsChanged',
        value: () => [],
      }
    }
  }

  _itemsChanged (newValue) {
  }

  itemByName (name) {
    return _.find(this.items, { name })
  }

  hasItem (name) {
    return !_.isUndefined(this.itemByName(name))
  }

  addItem (name, options = {}) {
    let item = this.itemByName(name)
    if (!item) {
      this.push('items', _.extend({ name }, options))
    }
  }

  dropItem (name) {
    let item = this.itemByName(name)
    if (item) {
      this.splice('items', _.indexOf(this.items, item), 1)
    }
  }

  useItem (name, target) {
    let item = this.itemByName(name)
    if (item) {
      let t = this.story.itemByName(target)
      if (t) {
      }
    }
  }

  setItem (name, options = {}) {
    let item = this.itemByName(name)
    if (item) {
      _.extend(item, options)
      this.set('items', _.clone(this.items))
    }
  }

  clearItems () {
    this.set('items', [])
  }

}
