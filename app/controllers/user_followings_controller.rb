class UserFollowingsController < ApplicationController
  def index
    render :json => current_user.followed_users, :only => [:id, :username]
  end
  
  def create  
    
    @following = Following.new(
      :followed_id => params[:followed_id],
      :follower_id => current_user.id
    )
    
    if @following.save
      render :json => User.find(params[:followed_id]), :only => [:id, :username]
    else
      render @following.errors.full_messages
    end
  end
  
  def destroy
    @followed_user = User.find(params[:id])
    current_user.followed_users.destroy(@followed_user)
    render :json => true
  end
end
