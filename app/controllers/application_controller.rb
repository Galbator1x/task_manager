class ApplicationController < ActionController::Base
  def serialize(subject, serializer, options = {})
    key = subject.respond_to?(:each) ? :each_serializer : :serializer
    options[key] = serializer

    ActiveModelSerializers::SerializableResource.new(subject, options)
  end
end
