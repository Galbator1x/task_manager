FactoryBot.define do
  sequence :email do |n|
    "email#{n}@test.com"
  end
  sequence :string do |n|
    "string#{n}"
  end
end
