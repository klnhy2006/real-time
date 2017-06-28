class SessionsController < ApplicationController
	def create
		user = User.find_by(name: params[:name])
		if user && user.authenticate(params[:password])
		  log_in (user)
		  redirect_to user
		end
	end
	
	def destroy
		log_out
		redirect_to root_url
    end
end
