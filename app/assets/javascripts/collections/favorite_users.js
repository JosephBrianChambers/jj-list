JjList.Collections.FavoriteUsers = Backbone.Collection.extend({
  model: JjList.Models.User,
  url: "user_followings"
})