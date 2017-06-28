class UsersController < ApplicationController
	def index
		@users = User.all
	end
	
	def show
		puts "showwww"
		@user = User.find_by(id: params[:id])
		respond_with @user
	end

	def create 
		@user = User.new(user_params) 
		if @user.save
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
