/**
 * @module mixins
 */

module.exports = Mixin(superclass => class Movable extends superclass {

  constructor () {
    super(...arguments)

    this._movable = false
    this._pressed = undefined

    this._movable_mousedown = this.movable_mousedown.bind(this)
    this._movable_mousemove = this.movable_mousemove.bind(this)
    this._movable_mouseup = this.movable_mouseup.bind(this)

    this.movable = true
  }

  movable_mousedown (e) {
    this._pressed = {
      x: e.detail.x - this.x,
      y: e.detail.y - this.y,
      button: e.detail.button,
    }
    e.stopPropagation()
  }

  movable_mousemove (e) {
    if (_.get(this, '_pressed.button') === 0) {
      this.x = e.detail.x - this._pressed.x
      this.y = e.detail.y - this._pressed.y
      e.stopPropagation()
    }
  }

  movable_mouseup () {
    this._pressed = undefined
  }

  destroy () {
    super.destroy()
    this.off('mouse.down', this._movable_mousedown)
    this.off('mouse.move', this._movable_mousemove)
    this.off('mouse.up', this._movable_mouseup)
  }

  get movable () { return this._movable }
  set movable (value) {
    if (value !== this._movable) {
      if (value) {
        this.on('mouse.down', this._movable_mousedown)
        this.on('mouse.move', this._movable_mousemove)
        this.on('mouse.up', this._movable_mouseup)
      }
      else {
        this.off('mouse.down', this._movable_mousedown)
        this.off('mouse.move', this._movable_mousemove)
        this.off('mouse.up', this._movable_mouseup)
      }
      this.emit('movable', value)
    }
  }

})
