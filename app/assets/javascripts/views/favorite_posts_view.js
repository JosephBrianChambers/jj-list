JjList.Views.FavoritePostsView = Backbone.View.extend({
  initialize: function (options) {
    //placeholder    
  },
  
  template: JST['posts/favorite_posts'],
  
  render: function () {
    var renderedContent = this.template({
      favoritePosts: this.collection,
    });
    this.$el.html(renderedContent);
    return this;
  }
})