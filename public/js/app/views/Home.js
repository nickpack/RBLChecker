define(["jquery", "backbone", "collections/Blacklists", "text!templates/results.html"],

    function($, Backbone, Blacklists, template){

        var Home = Backbone.View.extend({
            events: {
               'submit #ipform': 'checkRBLs'
            },
            el: ".results",

            initialize: function() {
                this.collection = new Blacklists();
                var self = this;

                self.collection.fetch({success: function(){
                    var compiledTemplate = _.template( template, { lists: self.collection.models } );
                    self.$el.html(compiledTemplate);
                }});
            },

            checkRBLs: function(e) {
                e.preventDefault();
                if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test($('.search-query').val())) {
                    $('.result').each(function() {
                        $.ajax({
                          dataType: "json",
                          url: 'check/'+$('.search-query').val()+'/'+$(this).data('endpoint'),
                          context: this,
                          success: function (data) {
                            if (data) {
                                $(this).parent().addClass('error');
                                $(this).html(data[0].replace( /(http:\/\/[^\s]+)/gi , '<a href="$1">$1</a>' ));
                            } else {
                                $(this).parent().addClass('success');
                                $(this).html('Not listed');
                            }
                          }
                        });
                    });
                } else {
                    alert ('FU');
                }
            }

        });

        return Home;

    }

);