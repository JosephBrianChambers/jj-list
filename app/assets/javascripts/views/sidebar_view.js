JjList.Views.SidebarView = Backbone.View.extend({
  initialize: function () {
    //place holder
  }, 
  
  template: JST['sidebar/sidebar'],
  
  render: function () {
    var renderedContent = this.template({
      users: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  }
  
})