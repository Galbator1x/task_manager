FactoryBot.define do
  factory :developer, aliases: [:assignee] do
    first_name { generate :string }
    last_name { generate :string }
    password { generate :string }
    email
  end
end
