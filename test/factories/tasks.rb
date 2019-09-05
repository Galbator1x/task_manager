FactoryBot.define do
  factory :task do
    author
    assignee
    name { generate :string }
    description { generate :string }
    expired_at { 1.month.from_now }
  end
end
