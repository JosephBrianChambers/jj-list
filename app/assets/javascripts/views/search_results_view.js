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
    "mouseenter .hit": "enterHit",
    "mouseleave .hit": "leaveHit",
    "mouseenter .star": "enterStar",
    "mouseleave .star": "leaveStar",
    "click .hit": "detailViaHit"
  },
  
  enterStar: function (event) {
    $(event.currentTarget).toggleClass("star-preview")
  },
  
  leaveStar: function (event) {
    $(event.currentTarget).toggleClass("star-preview")
  },
  
  enterHit: function (event) {
    var $hit = $(event.currentTarget);
    $hit.toggleClass("hit-hover");
  },
  
  leaveHit: function (event) {
    var $hit = $(event.currentTarget);
    $hit.toggleClass("hit-hover");
  },
  
  detailViaHit: function (event) {
    var postId = $(event.currentTarget).data("id")
    this.detailView(postId)
  },
  
  detailView: function (postId) {
    //this request for 1 post, but responce is an array
    
    var test = function (that) {
      $.ajax({
        url: "posts/" + postId,
        type: 'GET',
        success: function (data, status, jqXHR) { 
          var postView = new JjList.Views.PostView({
            model: new JjList.Models.Post(data[0])
          });
         
          that.$el.append("<div id='modal-view'></div>");
          var $modal = that.$el.find('#modal-view')
          $modal.html(postView.render().$el)
          $('#myModal').modal('toggle')
        }
      });  
    };
    //nessary to pass variable's to ajax success callback
    test(this);
  },
})


// var post = new JjList.Models.Post(data[0])
// var postView = new JjList.Views.PostView({
//   model: post,
// })