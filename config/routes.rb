Rails.application.routes.draw do

	root 'site#index'
	resources :users
	get '/user', to: 'users#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
