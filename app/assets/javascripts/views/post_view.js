JjList.Views.PostView = Backbone.View.extend({
  initialize: function () {
    //placeholder
  },
  
  template: JST["posts/detail"],
  
  render: function () {
    var renderedContent = this.template({
      post: this.model
    });
    this.$el.html(renderedContent);
    this.startCarousel()
    return this;
  },
  
  startCarousel: function () {
    $('.carousel').carousel({
      interval: false
    })
  }
});