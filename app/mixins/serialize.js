module.exports = Mixin(superclass => class Serialize extends superclass {

  _serializeName (name) {
    return _.toLower(_.replace(_.deburr(name), /[\!\@\#\$\%\^\&\*\(\)\=\+\|\[\]\{\}\'\"\,\.\/\?\~\`\~]/g, ''))
  }

})
