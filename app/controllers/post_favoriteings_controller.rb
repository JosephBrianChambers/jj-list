class PostFavoriteingsController < ApplicationController
  def index
    @posts = current_user.favorite_posts
    render "posts/index.json"
  end
  
  
  def create
    @post_favoriteing = PostFavoriteing.new({
      post_id: params[:post_id],
      user_id: params[:user_id]
    })
    
    if @post_favoriteing.save
      render :json => Post.find(params[:post_id])
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
