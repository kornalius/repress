/**
 * @module mixins
 */

module.exports = Mixin(superclass => class Resizable extends superclass {

  constructor () {
    super(...arguments)

    this._resizable = false
    this._pressed = undefined

    this._resizable_mousedown = this.resizable_mousedown.bind(this)
    this._resizable_mousemove = this.resizable_mousemove.bind(this)
    this._resizable_mouseup = this.resizable_mouseup.bind(this)

    this.resizable = true
  }

  resizable_mousedown (e) {
    this._pressed = {
      x: e.detail.x - this.x,
      y: e.detail.y - this.y,
      button: e.detail.button,
    }
    e.stopPropagation()
  }

  resizable_mousemove (e) {
    if (_.get(this, '_pressed.button') === 0) {
      // this.x = e.detail.x - this._pressed.x
      // this.y = e.detail.y - this._pressed.y
      e.stopPropagation()
    }
  }

  resizable_mouseup () {
    this._pressed = undefined
  }

  destroy () {
    super.destroy()
    this.off('mouse.down', this._resizable_mousedown)
    this.off('mouse.move', this._resizable_mousemove)
    this.off('mouse.up', this._resizable_mouseup)
  }

  get resizable () { return this._resizable }
  set resizable (value) {
    if (value !== this._resizable) {
      if (value) {
        this.on('mouse.down', this._resizable_mousedown)
        this.on('mouse.move', this._resizable_mousemove)
        this.on('mouse.up', this._resizable_mouseup)
      }
      else {
        this.off('mouse.down', this._resizable_mousedown)
        this.off('mouse.move', this._resizable_mousemove)
        this.off('mouse.up', this._resizable_mouseup)
      }
      this.emit('resizable', value)
    }
  }

})
