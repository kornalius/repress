module.exports = superclass => class extends superclass {

  static get properties () {
    return {
      stats: {
        type: Array,
        observer: '_statsChanged',
        value: () => [],
      }
    }
  }

  _statsChanged (newValue) {
  }

  statByName (name) {
    return _.find(this.stats, { name })
  }

  incrementStat (name, value) {
    let stat = this.statByName(name)
    if (stat) {
      let v = stat.value
      v += value
      if (_.isNumber(stat.max) && v > stat.max) {
        v = stat.max
      }
      stat.value = v
      this.set('stats', _.clone(this.stats))
    }
  }

  decrementStat (name, value) {
    let stat = this.statByName(name)
    if (stat) {
      let v = stat.value
      v -= value
      if (_.isNumber(stat.min) && v < stat.min) {
        v = stat.min
      }
      stat.value = v
      this.set('stats', _.clone(this.stats))
    }
  }

  setStat (name, value) {
    let stat = this.statByName(name)
    if (stat) {
      let v = stat.value
      v -= value
      if (_.isNumber(stat.min) && v < stat.min) {
        v = stat.min
      }
      if (_.isNumber(stat.max) && v > stat.max) {
        v = stat.max
      }
      stat.value = v
      this.set('stats', _.clone(this.stats))
    }
  }

  addStat (name, value, options = {}) {
    let stat = this.statByName(name)
    if (!stat) {
      this.push('stats', {
        name,
        value,
        min: _.get(options, 'min'),
        max: _.get(options, 'max'),
        hint: _.get(options, 'hint'),
        label: _.get(options, 'label', name),
      })
    }
  }

  removeStat (name, value) {
    let stat = this.statByName(name)
    if (stat) {
      this.splice('stats', _.indexOf(this.stats, stat), 1)
    }
  }

  clearStats () {
    this.set('stats', [])
  }

}
