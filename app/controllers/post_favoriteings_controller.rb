class PostFavoriteingsController < ApplicationController
  def index
    @posts = current_user.favorite_posts.includes(:photos)
    render "posts/index.json"
  end
  
  def create
    @post_favoriteing = PostFavoriteing.new({
      post_id: params[:post_id],
      user_id: params[:user_id]
    })
    
    if @post_favoriteing.save
      #using @posts(plurl) to utilize RABL template
      @posts = Post.includes(:photos).find(params[:post_id])
      render "posts/index.json"
    else
      render :json => @post_favoriteing.errors.full_messages
    end
  end
  
  def destroy
    @post = Post.find(params[:id])
    current_user.favorite_posts.destroy(@post)
    
    render :json => true
  end  
end
