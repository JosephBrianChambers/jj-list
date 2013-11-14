JjList.Views.HitsListMixin = Backbone.View.extend({
  
  events: {
    "mouseenter .hit": "enterHit",
    "mouseleave .hit": "leaveHit",
    "mouseenter .star": "enterStar",
    "mouseleave .star": "leaveStar",
    "click .postStar": "clickPostStar",
    "click .star-post-btn": "clickStarButton",
    "click .star-author-btn": "clickAuthorButton",
    "click .exit-modal": "exitModal",
    "click .title-preview": "detailViaHit",
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
   
  clickPostStar: function (event) {
    var postId = $(event.target).parents(".hit").data("id");
    var $star = $(event.currentTarget);
    this.editPostFavorite(postId, $star);
  },
  
  clickStarButton: function (event) {
    var $star = $(event.currentTarget).children(".postStar")
    var postId = $(event.currentTarget).data("id")
    this.editPostFavorite(postId, $star)
    $('#'+postId).find('.postStar').toggleClass("stared")
  },
  
  clickAuthorButton: function (event) {
    var authorId = $(event.currentTarget).data("authorid");
    var $star = $(event.currentTarget).children('.authorStar');
    this.editAuthorFavorite(authorId, $star);
  },
  
  editAuthorFavorite: function (authorId, $star) {    
    //determin if author is already favorited
    var authorFavorited = false;
    JjList.currentUser.get("favoriteUsers").forEach(function (user) {
      if (authorId === user.id) {authorFavorited = true};
    });

    //run an ajax request, either create or destroy
    if (authorFavorited) {
      //destroy
      
      $.ajax({
        url: "user_followings/" + authorId,
        type: "DELETE",
        success: function(data, status, jqXHR) {
          // !BAD need to refactor routes and use Backbone collectons for this.
          var modelToRemove = JjList.currentUser.get("favoriteUsers").get(authorId)
          JjList.currentUser.get("favoriteUsers").remove(modelToRemove)
          $star.removeClass("stared");
        },
      });
    } else {
      //create
      $.ajax({
        url: "user_followings",
        type:"POST",
        data: {
          follower_id: JjList.currentUser.id,
          followed_id: authorId
        },
        success: function (data, status, jqXHR) {
          JjList.currentUser.get("favoriteUsers").add(data)
          $star.addClass("stared");
        },
        
        error: function (data, status, jqXHR) {  
        },
      });
    };
  },
  
  editPostFavorite: function (postId, $star) {
    var userId = JjList.currentUser.id;
    
    //determin if post is already favorited
    var postFavorited = false;
    JjList.currentUser.get("favoritePosts").forEach(function (post) {
      if (postId === post.id) { postFavorited = true};
    });
    //run an ajax request, either create or destroy
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
      $.ajax({
        url: "post_favoriteings",
        type:"POST",
        data: {
          user_id: userId,
          post_id: postId
        },
        success: function (data, status, jqXHR) {
          //var modelToAdd = new JjList.Models.Post(data[0])
          $star.addClass("stared")
          JjList.currentUser.get("favoritePosts").add(data[0])
        }
      });
    };
  },
  
  exitModal: function (event) {
    var fragment = $(event.currentTarget).data("url");
    
    $('#myModal').modal('hide');
    $('#myModal').on('hidden.bs.modal', function () {
      JjList.postsRouter.navigate(fragment,{trigger: true});
    });
  },
  
  detailViaHit: function (event) {
    event.preventDefault()
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