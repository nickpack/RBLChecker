define(["jquery", "backbone"],

    function($, Backbone) {

        var Blacklist = Backbone.Model.extend({

            defaults: {
                name: null,
                endpoint: null
            },

            validate: function () {

            }
        });

        return Blacklist;

    }

);
