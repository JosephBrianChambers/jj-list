class PostsController < ApplicationController
  def new
    render :new
  end
  
  def create
    #find post and build associated photos
    p params
    p "joejoejoejeo"
    @post = Post.new(params[:post])
    @post.user_id = current_user.id
    unless params[:photos].nil?
      params[:photos].each do |image|
        @post.photos.build({image: image})
      end
    end
      
    if @post.save
      render :json => @post, :status => 200
    else
      flash.now[:notice]  = @post.errors.full_messages
      render @post.errors.full_messages
    end
  end
  
  def index
    #search params
    q    = params[:search][:q]
    min  = params[:search][:min].empty? ? 0      : params[:search][:min].to_i
    max  = params[:search][:max].empty? ? 999999 : params[:search][:max].to_i
    pic  = params[:search][:pic].nil?   ? false  : true
    days = params[:search][:days].to_i
    now  = Time.now
    #does search want a picture?
    if pic
      @posts = Post
        .joins(:photos).select('distinct posts.*')
        .where(price: min..max)
        .where(created_at: now-days.days..now)
        .search(q)
    else
      @posts = Post.includes(:photos)
        .where(price: min..max)
        .where(created_at: now-days.days..now)
        .search(q)
    end
    
    render "posts/index.json"
  end
  
  def show
    #using @posts(plurl) to utilize RABL template
    @posts = Post.includes(:photos).find(params[:id])
    render "posts/index.json"
  end
  
  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    redirect_to posts_url
  end
end
