ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'coveralls'
require 'simplecov'

Coveralls.wear!
SimpleCov.start

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods

  fixtures :all
end
