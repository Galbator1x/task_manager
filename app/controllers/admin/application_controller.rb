class Admin::ApplicationController < ApplicationController
  include Concerns::AuthHelper

  before_action :authenticate_user!, :authorize
  helper_method :current_user

  respond_to :html

  def authorize
    render(file: File.join(Rails.root, 'public/403.html'), status: 403, layout: false) if forbidden?
  end

  def forbidden?
    !current_user.is_a?(Admin)
  end
end
