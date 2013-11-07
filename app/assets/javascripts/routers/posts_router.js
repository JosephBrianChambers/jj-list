JjList.Routers.PostsRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },
  
  routes: {
    "": "searchIndex",
    "posts/new": "createPost",
  },
  
  searchIndex: function () {
    var parentSearchView = new JjList.Views.ParentSearchView();
    this.$rootEl.html(parentSearchView.render().$el);
  },
  
  createPost: function () {
    var newPostView = new JjList.Views.NewPostView();
    this.$rootEl.html(newPostView.render().$el);
  }
})