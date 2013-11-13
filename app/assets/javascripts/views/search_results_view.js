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
    "click .star": "postStar",
    "click .exit-modal": "exitModal",
    "click .title-preview": "detailViaHit"
  },
  
  enterHit: function (event) {
    var $hit = $(event.currentTarget);
    $hit.toggleClass("hit-hover");
  },
  
  leaveHit: function (event) {
    var $hit = $(event.currentTarget);
    $hit.toggleClass("hit-hover");
  },
  
  enterStar: function (event) {
    $(event.currentTarget).toggleClass("star-preview")
  },
  
  leaveStar: function (event) {
    $(event.currentTarget).toggleClass("star-preview")
  },
  
  postStar: function (event) {
    var postId = $(event.target).parents(".hit").data('id');
    var userId = JjList.currentUser.id;
    var $star = $(event.currentTarget);
    
    //determin if post is stared(determin value of var stared)
    var postFavorited = false;
    JjList.currentUser.get("favoritePosts").forEach(function (post) {
      if (postId === post.id) { postFavorited = true}
    });
    
    //run an ajax request, either star or unstar
    if (postFavorited) {
      //destroy PostFavoriteing request
      var modelToDestroy = JjList.currentUser.get("favoritePosts").get(postId);
      modelToDestroy.destroy({
        success: function (response) {
          $star.removeClass("stared");
        },
      });
    } else {
      //create PostFavoriteing request
      JjList.currentUser.get("favoritePosts").create({
        //attributes
        post_id: postId,
        user_id: userId
      }, {
        //options
        success: function (response) {
          $star.addClass("stared")
        },
      });
    };
  },
  
  exitModal: function () {
    $('#myModal').modal('hide')
  },
  
  detailViaHit: function (event) {
    var postId = $(event.currentTarget).parents('.hit').data("id")
    this.detailView(postId)
  },
  
  detailView: function (postId) {
    //this request for 1 post, but responce is an array
    
    var test = function (that) {
      $.ajax({
        url: "posts/" + postId,
        type: 'GET',
        success: function (data, status, jqXHR) { 
          //create detail post view
          var postView = new JjList.Views.PostView({
            model: new JjList.Models.Post(data[0])
          });

          //insert modal html to current view and manual trigger it
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

