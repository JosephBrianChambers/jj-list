class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end
  
  def create
    @user = User.new(params[:user])
    if @user.save
      session[:session_token] = @user.reset_session_token!
      redirect_to root_url
    else
      flash.now[:notice] = @user.errors.full_messages
      render :new      
    end
  end
  
  def index
    render :json => current_user.followed_users.pluck(:username)
  end
end
