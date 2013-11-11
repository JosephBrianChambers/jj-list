JjList.Collections.UserPosts = Backbone.Collection.extend({
  initialize: function (models, options){
    //placeholder
  },
  model: JjList.Models.Post,
  url: function () {
    return "users/" + JjList.currentUser.id + "/posts"
  }
})