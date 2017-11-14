const Emitter = require('./events').Emitter
const async = require('../utils').async

class Base extends Emitter {

  async (fn, args, delay) {
    async(this, fn, args, delay)
  }

  clone () {
    return _.cloneDeep(this)
  }

  fire (name, data) {
    this.emit(name, data)
    if (window.Repress) {
      if (this !== window.Repress.player) {
        window.Repress.player.emit(name, data)
      }
      if (this !== window.Repress.story) {
        window.Repress.story.emit(name, data)
      }
    }
  }

}

module.exports = Base
