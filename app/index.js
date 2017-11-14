const utils = require('./utils')

window.Repress = {
  ItemsMixin: window.Polymer.dedupingMixin(require('./mixins/items')),
}
