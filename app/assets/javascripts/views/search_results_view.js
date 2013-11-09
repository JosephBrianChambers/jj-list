JjList.Views.SearchResultsView = Backbone.View.extend({
  initialize: function () {
    //place holder
  },
  
  template: JST['search/results'],
  
  render: function () {
    var renderedContent = this.template({
      results: this.collection,
      title: "Search Results"
    });
    this.$el.html(renderedContent);
    return this;
  }
})