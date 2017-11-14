// import 'web-audio-daw'

const Base = require('./classes/base')

const _STOPPED = 0
const _RUNNING = 1
const _PAUSED = 2

class Main extends Base {

  reset () {
    this._state = _STOPPED

    this._updates = {
      queue: [],

      add: options => {
        let o = _.get(options, 'object')
        if (o && !o.__inUpdates) {
          o.__inUpdates = true
          this._updates.queue.push(options)
        }
      },

      remove: o => {
        this._updates.queue = _.reject(this._updates.queue, { object: o })
        o.__inUpdates = false
      },
    }

    return this
  }

  destroy () {
    this.clear()
    return this
  }

  tick (delta) {
    if (this.state === _RUNNING) {
      for (let q of this._updates.queue) {
        q.object.__inUpdates = false
        if (q.cb) {
          q.cb(q.object, ...(q.args || []))
        }
      }

      this._updates.queue = []

      let t = performance.now()
    }
  }

  get state () { return this._state }

  set state (value) {
    if (this._state !== value) {
      this._state = value
    }
  }

  get isRunning () { return this._state === _RUNNING }
  get isPaused () { return this._state === _PAUSED }

  get updates () { return this._updates }

  start () {
    if (!this.isRunning) {
      this.state = _RUNNING
      this.fire('start')
    }
    return this
  }

  stop () {
    if (this.isRunning) {
      this.state = _STOPPED
      this.fire('stop')
    }
    return this
  }

  pause () {
    if (!this.isPaused) {
      this.state = _PAUSED
      this.fire('paused')
    }
    return this
  }

  resume () {
    if (this.isPaused) {
      this.state = _RUNNING
      this.fire('resume')
    }
    return this
  }

}

module.exports = {
  _STOPPED,
  _RUNNING,
  _PAUSED,
  Main,
}
