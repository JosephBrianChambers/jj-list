JjList.Views.ParentSearchView = Backbone.View.extend({
 
  
  initialize: function () {
    //instanciate new child search view(search box)
    //and insert its rendered el into my el
    //possibly the search results view as well
 
    this.searchResultsView = new JjList.Views.SearchResultsView({
      collection: new JjList.Collections.SearchResults()
    });
  },
  
  template: JST['search/parentSearch'],
  
  render: function () {
    var renderedContent = this.template({
      //anything to pass?
    });
    this.$el.html(renderedContent);
    this.$el.append(this.searchResultsView.render().$el);
    return this;
  },
  
  events: {
    "submit #search-form": "getResults"
  },
  
  getResults: function (event) {
    event.preventDefault()
    var that = this;    
    var formData = $(event.target).serializeJSON();
    $('.hits-list').html(JST['_loading'])
    this.searchResultsView.collection.fetch({
      data: formData,
      
      success: function (collection, response, options) {
        
        if (collection.length === 0) {
          $('.hits-list').html(
            '<div class=no-results>Zero Listings Found</div>'
          )
        } else {
         that.searchResultsView.render();  
        };     
      },
    });
    
    
  }
})