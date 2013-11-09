JjList::Application.routes.draw do
  root to: 'StaticPages#root'
  get '/welcome', to: 'StaticPages#welcome' 
  resources :users, :only => [:create, :new, :index] do
    scope module: 'users' do
      resources :posts, :only => [:index]
    end
  end
  resources :posts, :only => [:create, :destroy, :index, :new]
  resource :session, :only => [:create, :destroy]
  
  
end