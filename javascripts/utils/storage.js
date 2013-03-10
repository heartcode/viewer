
/*!
  * Utils.Storage
  *
  * A storage solution, that aims to help us to store and retrieve key/value pairs using localStorage
  * WIP! The storage is quickly written and COOKIE fallback mode is not yet implemented...
  *
  * 2013 Robert Pataki [robert@robertpataki.com]
  *
*/

Utils.namespace('Utils.Storage');
Utils.Storage = (function () {
  var LOCALSTORAGE = 'localStorage',
      COOKIE = 'cookie',
      storageType,

      /*
        * Returns if the browser handles localStorage or cookies and stores the result
        * @method supportedStorageType
        * @private
        *
      */
      initialize = function () {
        if (!storageType) {
          try {
            if ('localStorage' in window && window['localStorage'] !== null) {
              storageType = LOCALSTORAGE;
            }
          } catch (e) {
            storageType = COOKIE;
          }
        }
      },

      /*
        * Returns any stored values by key
        * @method getVal
        * @param key {String} The key of the value to look up
        * @param default_value {String} The default value is saved, then returned if the key is not found
        * @return {String}
        * @public
      */
      getVal = function (key, default_value) {
        var value = default_value;
        if (storageType === LOCALSTORAGE && key) {
          if (localStorage.getItem(key)) {
            value = localStorage.getItem(key);
          } else {
            setVal(key, default_value);
          }
        }
        return value;
      },

      /*
        * Stores a value by key
        * @method setVal
        * @param key {String} The key holding the value
        * @param value {Number, String} The value to be stored
        * @public
      */
      setVal = function (key, value) {
        if (storageType === LOCALSTORAGE && key && typeof value !== 'undefined') {
          localStorage.setItem(key, value);
        }
      };

  initialize();

  return {
    getVal: getVal,
    setVal: setVal
  };
}());