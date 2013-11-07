JjList.Routers.PostsRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },
  
  routes: {
    "": "searchIndex"
  },
  
  searchIndex: function () {
    var that = this;
    var parentSearchView = new JjList.Views.ParentSearchView;
    that.$rootEl.html(parentSearchView.render().$el)
  };
})