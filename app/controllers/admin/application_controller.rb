class Admin::ApplicationController < ApplicationController
  include Concerns::AuthHelper

  helper_method :current_user
end
