JjList.Routers.PostsRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$sidebar = options.$sidebar;
    var that = this;
    
    var favoriteUsers = new JjList.Collections.FavoriteUsers({
      model: JjList.Models.User
    });
    
    var sidebarView = new JjList.Views.SidebarView({
      collection: favoriteUsers
    });
    
    favoriteUsers.fetch({
      success: function(collection, response, options) {
        that.$sidebar.html(sidebarView.render().$el);
      },
    });
  },
  
  routes: {
    "": "searchIndex",
    "posts/new": "createPost",
    "posts/myPosts": "currentUserPosts",
  },
  
  searchIndex: function () {
    var parentSearchView = new JjList.Views.ParentSearchView();
    this.$rootEl.html(parentSearchView.render().$el);
  },
  
  createPost: function () {
    var newPostView = new JjList.Views.NewPostView({});
    this.$rootEl.html(newPostView.render().$el);
  },
  
  currentUserPosts: function () {
    var that = this;
    var currentUserPosts = new JjList.Collections.UserPosts([],{
      user_id: JjList.currentUser.id
    })
    
    var currentUserPostsView = new JjList.Views.UserPostsView({
      collection: currentUserPosts
    });
    
    currentUserPosts.fetch({
      success: function () {
        that.$rootEl.html(currentUserPostsView.render().$el);
      },
    });
  },
})