class Users::PostsController < ApplicationController
  def index
    user = User.find(params[:user_id])
    @posts = user.posts
    render "posts/index.json"
  end
end
