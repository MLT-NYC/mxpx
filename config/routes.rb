Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do 

    resources :users, only: [:create, :show, :update] do
      post :follow, to: 'follows#follow', as: 'follow' 
      delete :unfollow, to: 'follows#unfollow', as: 'unfollow'
    end
    
    resource :session, only: [:create, :destroy]

    resources :pictures, only: [:show, :index, :create, :update, :destroy] do 
      resources :comments, only: [:create, :destroy, :index]
      post :like, to: 'likes#like', as: 'like' 
      delete :unlike, to: 'likes#unlike', as: 'unlike'
    end

    resources :comments, only: [:index] do 
      resources :comments, only: [:create, :destroy, :index]
    end
  end

end
