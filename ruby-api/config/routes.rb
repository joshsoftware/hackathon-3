Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      post '/login', to: 'sessions#login'
      post '/events', to: 'user_events#create'
      post '/metrics', to: 'user_events#get_metrics'
      resources :aggregate_events, only: [:index]
    end
  end
  # Defines the root path route ("/")
  # root "posts#index"
end
