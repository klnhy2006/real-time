module SessionsHelper
# Logs in the given user.
  def log_in(user)
    session[:user_id] = user.id
	#session is a rails method, different from sessions controller
  end
  
  # Returns the current logged-in user (if any).
  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end
  
   # Returns true if the user is logged in, false otherwise.
  def logged_in?
    !current_user.nil?
  end
  
  # Logs out the current user.
  def log_out
    session.delete(:user_id)
    @current_user = nil
  end
end

#included in application controller, so available to all controllers.
#available to all views by default