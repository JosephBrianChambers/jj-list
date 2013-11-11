JjList.Views.SearchResultsView = Backbone.View.extend({
  className: "row",
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
  },
  
  events: {
    "click .hit": "detailViaHit"
  },
  
  detailViaHit: function (event) {
    var postId = $(event.currentTarget).data("id")
    this.detailView(postId)
  },
  
  detailView: function (postId) {
    //this request for 1 post, but responce is an array
    $.ajax({
      url: "posts/" + postId,
      type: 'GET',
      success: function (data, status, jqXHR) {
        //make sure to pick out post from resoponse array
        var post = new JjList.Models.Post(data[0])
        var postView = new JjList.Views.PostView({
          model: post
          debugger
        })
      },
      
      error: function (resp) {
        debugger
      },
    });
  },
})