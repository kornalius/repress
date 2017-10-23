const Emitter = require('./events').Emitter
const async = require('../utils').async

class Base extends Emitter {

  async (fn, args, delay) {
    async(this, fn, args, delay)
  }

  clone () {
    return _.cloneDeep(this)
  }

}

module.exports = Base
