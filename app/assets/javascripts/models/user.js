JjList.Models.User = Backbone.Model.extend({
  initialize: function (attributes, options) {
    this.id = attributes.id
    this.username = attributes.username  
  },
  
})