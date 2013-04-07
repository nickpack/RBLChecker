define(["jquery", "backbone", "models/Blacklist", "views/Home", "collections/Blacklists"],
        
    function($, Backbone, Blacklist, Home, Blacklists) {

        var MobileRouter = Backbone.Router.extend({

            initialize: function() {
                Backbone.history.start();
            },

            routes: {
                "": "index"
            },

            index: function() {
                new Home();
            }
    
        });

        return MobileRouter;

    }

);