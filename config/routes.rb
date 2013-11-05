JjList::Application.routes.draw do
  root to: 'StaticPages#root'
  get '/welcome', to: 'StaticPages#welcome' 
  resources :users, :only => [:create, :new]
  resource :session, :only => [:create, :destroy]
end