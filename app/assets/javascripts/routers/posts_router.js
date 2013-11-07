JjList.Routers.PostsRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },
  
  routes: {
    "": "searchIndex"
  },
  
  searchIndex: function () {
    var parentSearchView = new JjList.Views.ParentSearchView();
    this.$rootEl.html(parentSearchView.render().$el)
  },
})