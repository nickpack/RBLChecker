// Collection.js
// -------------
define(["jquery","backbone","models/Blacklist"],

  function($, Backbone, Blacklist) {
    var Blacklists = Backbone.Collection.extend({
      model: Blacklist,
      url: '/lists.json'
    });

    return Blacklists;

  }

);