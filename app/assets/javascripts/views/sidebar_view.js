JjList.Views.SidebarView = Backbone.View.extend({
  className: "bs-sidebar hidden-print affix",
  
  initialize: function () {
    //placeholder
  }, 
  
  template: JST['sidebar/sidebar'],
  
  render: function () {
    var renderedContent = this.template({
      users: JjList.currentUser.attributes.favoriteUsers,
      posts: JjList.currentUser.attributes.favoritePosts
    });
    
    this.$el.html(renderedContent);
    this.$el.find('#tabs').tabs();
    return this;
  },
  
  events: {
    "click #search-btn": "redirectSearch",
    "click #create-post-btn": "redirectCreatePost",
    "click #favorite-post-btn": "redirectFavoritePosts",
    "click #my-posts-btn": "redirectMyPosts",
    
  },
  
  redirectSearch: function (event) {
    
    JjList.postsRouter.navigate("#",{trigger: true});
  },
  
  redirectCreatePost: function (event) {
    JjList.postsRouter.navigate("#posts/new",{trigger: true});
  },
  
  redirectFavoritePosts: function (event) {
   debugger 
    JjList.postsRouter.navigate("#favoritePosts", {trigger: true});
  },
  
  redirectMyPosts: function (event) {
    
    var fragment = "#/users/" + JjList.currentUser.id + "/posts"
    JjList.postsRouter.navigate(fragment,{trigger: true});
  },
})

