JjList.Collections.UserPosts = Backbone.Collection.extend({
  initialize: function (models, options){
    this.user_id = options.user_id
  },
  model: JjList.Models.Post,
  url: function () {
    return "users/" + this.user_id + "/posts"
  }
})