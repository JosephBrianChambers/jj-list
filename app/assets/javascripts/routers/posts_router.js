JjList.Routers.PostsRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$sidebar = options.$sidebar;
    
    var sidebarView = new JjList.Views.SidebarView();
    this.$sidebar.html(sidebarView.render().$el);
  },
  
  routes: {
    "": "searchIndex",
    "posts/new": "createPost",
    "users/:user_id/posts": "UserPosts",
  },
  
  searchIndex: function () {
    var parentSearchView = new JjList.Views.ParentSearchView();
    this.$rootEl.html(parentSearchView.render().$el);
  },
  
  createPost: function () {
    var newPostView = new JjList.Views.NewPostView({});
    this.$rootEl.html(newPostView.render().$el);
  },
  
  UserPosts: function (user_id) {
    var that = this;
    var user = new JjList.Models.User({
      id: user_id
    })
    user.fetch({})
    
    var userPosts = new JjList.Collections.UserPosts([],{
      model: JjList.Models.Post,
      user_id: user_id
    });
    
    var userPostsView = new JjList.Views.UserPostsView({
      collection: userPosts,
      user: user
    });
    
    userPosts.fetch({
      success: function () {
        that.$rootEl.html(userPostsView.render().$el);
      },
    });
  },
})