class PostsController < ApplicationController
  def new
    render :new
  end
  
  def create
    @post = Post.new(params[:post])
    @post.user_id = current_user.id
    unless params[:photos].nil?
      params[:photos].each do |image|
        @post.photos.build({image: image})
      end
    end
      
    if @post.save
      redirect_to posts_url
    else
      flash.now[:notice]  = @post.errors.full_messages
      render :new
    end
  end
  
  def index
    #render :index
    @search_query = params[:q]
    render :json => Post.search(@search_query)
  end
  
  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    redirect_to posts_url
  end
end
