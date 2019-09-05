FactoryBot.define do
  factory :manager, aliases: [:author] do
    first_name { generate :string }
    last_name { generate :string }
    password { generate :string }
    email
  end
end
