Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do 

    resources :users, only: [:create, :show] do
      post :follow, to: 'follows#follow', as: 'follow' 
      delete :unfollow, to: 'follows#unfollow', as: 'unfollow'
    end
    
    resource :session, only: [:create, :destroy]
    resources :pictures, only: [:show, :index, :create, :update, :destroy]
  end

end
