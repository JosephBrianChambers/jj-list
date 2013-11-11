JjList.Views.SidebarView = Backbone.View.extend({
  initialize: function () {
    //placeholder
  }, 
  
  template: JST['sidebar/sidebar'],
  
  render: function () {
    var renderedContent = this.template({
      users: JjList.currentUser.attributes.favoriteUsers,
      posts: JjList.currentUser.attributes.favoritePosts
    });
    
    this.$el.html(renderedContent);
    this.zAccordion();
    return this;
  },
  
  events: {
    "click #featured": "zAccordion"
  },
  
  zAccordion: function () {
  	this.$el.find("#featured").zAccordion({
    	timeout: 4000,
    	slideWidth: 180,
    	width: 200,
    	height: 270,
      auto: false,
      speed: 100,
  	});
   
  }

  
  
})

