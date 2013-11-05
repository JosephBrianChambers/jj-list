module ApplicationHelper
  def current_user
    @current_user || User.find_by_session_token(session[:session_token])
  end
  
  def logged_in?
    !!current_user
  end
  
  def require_current_user!
    redirect_to welcome_url unless logged_in?
  end
end
