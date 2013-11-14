JjList::Application.routes.draw do
  root to: 'StaticPages#root'
  get '/welcome', to: 'StaticPages#welcome' 
  resources :users, :only => [:create, :new, :show] do
    scope module: 'users' do
      resources :posts, :only => [:index] 
    end
  end
  resources :posts, :only => [:create, :destroy, :index, :new, :show]
  resource :session, :only => [:create, :destroy]
  resources :post_favoriteings, :only => [:create, :destroy, :index]
  resources :user_followings, :only => [:index, :create, :destroy]
  
  
end