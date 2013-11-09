JjList.Views.UserPostsView = Backbone.View.extend({
  initialize: function () {
    //get user name whos posts to be viewed
    //generate title of template with acquired username
  },
  
  template: JST['posts/user_posts'],
  
  render: function () {
    var renderedContent = this.template({
      results: this.collection,
      title: "MY POSTS!!!!"
    });
    this.$el.html(renderedContent);
    return this;
  }
})