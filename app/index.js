const utils = require('./utils')

window.Repress = {
  ItemsMixin: window.Polymer.dedupingMixin(require('./mixins/items')),
  StatsMixin: window.Polymer.dedupingMixin(require('./mixins/stats')),
  DisabledMixin: window.Polymer.dedupingMixin(require('./mixins/disabled')),
}
