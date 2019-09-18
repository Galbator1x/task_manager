class Web::ApplicationController < ApplicationController
  include Concerns::AuthHelper

  respond_to :html

  helper_method :current_user
end
