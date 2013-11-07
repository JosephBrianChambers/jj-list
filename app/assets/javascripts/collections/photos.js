JjList.Collections.Photos = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.post = options.post
  },
  
  model: JjList.Models.Photo
})