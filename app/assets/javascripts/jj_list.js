window.JjList = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    JjList.postsRouter = new JjList.Routers.PostsRouter({
      
      "$rootEl": $('#content')
    });
    Backbone.history.start();
    
  }
};

$(document).ready(function(){
  JjList.initialize();
});
