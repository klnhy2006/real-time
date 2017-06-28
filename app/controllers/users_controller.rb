class UsersController < ApplicationController
	def index
		@users = User.all
	end
	
	def show
		@user = User.find_by(id: params[:id])
		if @user != current_user
			return render json: {status: 'error', message: 'User not logged in'}
		end
	end

	def create 
		@user = User.new(user_params) 
		if @user.save
			log_in(@user)
			redirect_to @user
		else
			return render json: {status: 'error', message: 'User not created'}
		end 
	end
	
	private 

		def user_params 
			params.require(:user).permit(:name, :password) 
		end 
end
