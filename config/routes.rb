JjList::Application.routes.draw do
  root to: 'StaticPages#root'
  get '/welcome', to: 'StaticPages#welcome' 
  resources :users, :only => [:create, :new]
  resources :posts, :only => [:create, :destroy, :index, :new]
  resource :session, :only => [:create, :destroy]
end