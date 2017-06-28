Rails.application.routes.draw do

	root 'site#index'
	resources :users
	post '/sessions', to: 'sessions#create'
	delete '/logout', to: 'sessions#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
