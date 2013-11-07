JjList.Models.Post = Backbone.Model.extend({
  urlRoot: "post",
  
  parse: function (response, options) {
    this.photos = new JjList.Collections.Photos(
      response.photos,
      {post: this}
    );
    delete response.photos
    return response
  },
  
  
})