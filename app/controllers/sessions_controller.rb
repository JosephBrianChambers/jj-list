class SessionsController < ApplicationController
  def new
    render :new
  end
  
  def create
    @user = User.find_by_credentials(
    params[:user][:email],
    params[:user][:password]
    )
    
    if @user
      session[:session_token] = @user.reset_session_token!
      redirect_to root_url
    else
      redirect_to welcome_url
      #render :new
    end
  end
  
  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    redirect_to root_url  
  end
  
  
  def guest
    #35 is guest id
    @guest = User.find(35)
    session[:session_token] = @guest.reset_session_token!
    redirect_to root_url
  end
end
