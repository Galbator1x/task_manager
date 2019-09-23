require 'coveralls'
Coveralls.wear!('rails')

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods

  fixtures :all
end

module SignInHelper
  def sign_in_as(user)
    post session_path, params: {
      session: {
        password: user.password,
        email: user.email
      }
    }
  end
end

class ActionDispatch::IntegrationTest
  include SignInHelper
end
