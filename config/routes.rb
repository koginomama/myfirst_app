Rails.application.routes.draw do
  devise_for :users
  root to: 'garments#index'
end
