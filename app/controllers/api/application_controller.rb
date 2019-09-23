class Api::ApplicationController < ApplicationController
  include Concerns::AuthHelper

  respond_to :json

  helper_method :current_user
end
