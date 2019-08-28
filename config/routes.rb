Rails.application.routes.draw do
  namespace :web do
    get 'boards/show'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
