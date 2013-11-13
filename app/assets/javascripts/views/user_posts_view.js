JjList.Views.UserPostsView = Backbone.View.extend({
  initialize: function (options) {
    //get user name whos posts to be viewed
    //generate title of template with acquired username
    this.user = options.user
    debugger
  },
  
  template: JST['posts/user_posts'],
  
  render: function () {
    var renderedContent = this.template({
      results: this.collection,
      author: this.user
    });
    this.$el.html(renderedContent);
    return this;
  }
})