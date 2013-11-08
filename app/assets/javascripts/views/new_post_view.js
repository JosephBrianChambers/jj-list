JjList.Views.NewPostView = Backbone.View.extend({
  initialize: function () {
    this.photoUrls = [""]
  },
  
  template: JST['posts/new'],
  
  render: function () {
    var renderedContent = this.template({});
    this.$el.html(renderedContent);
    return this;
  },
  
  events: {
    "submit #new-post": "createPost",
    "change #uploadimage": "encodeFile"
  },
  
  createPost: function(event) {
    event.preventDefault();
    var formData = $(event.target).serializeJSON()
    formData.photos = this.photoFiles
    debugger
    $.ajax({
      url: "posts",
      type: "POST",
      data: formData,
      success: function(response, status, jqXHR) {
        //flash message on screen
        JjList.postsRouter.navigate("posts/myPosts", {trigger: true});
      },
      
      error: function( response, status, jqxHR) {
        //flash message on screen
      }
    });
  },
  
  encodeFile: function (event) {
    var that = this;
    var files = event.currentTarget.files
    var convertedFiles = []
    
    //reads and pushes converted files one at a time, waiting until finished
    //runs a callback only after all files are pushed into array
    var helper = function(idx, callback) {
      var fileReader = new FileReader();
      
      //callback for successful file read
      fileReader.onloadend = function () {
        convertedFiles.push(fileReader.result)
        //logic to read another file or invoke callback
        if (idx < files.length-1) {
          helper(++idx, callback);
        } else {
          callback()
        }
      }
      //call to read a file
      fileReader.readAsDataURL(files[idx]);
    };
    
    //helper function call with callback
    helper(0, function () {
      console.log(convertedFiles)
      that.photoFiles = convertedFiles
    });
  }
})




