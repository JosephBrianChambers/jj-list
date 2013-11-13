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
    
  },
  
})

