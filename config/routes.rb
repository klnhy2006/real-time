Rails.application.routes.draw do
	root 'site#index'
	resources :users
	resources :posts
	resources :comments
	resources :replies
	# delete '/replies', to: 'replies#destroy'
	# delete '/posts', to: 'posts#destroy'
	# delete '/comments', to: 'comments#destroy'
	get '/search_posts', to: 'posts#search_posts'
	get '/post', to: 'posts#show'
	post '/sessions', to: 'sessions#create'
	delete '/logout', to: 'sessions#destroy'
	
	mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
