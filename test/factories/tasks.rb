FactoryBot.define do
  factory :task do
    name { generate :string }
    description { generate :string }
    association :author
    association :assignee
  end
end
