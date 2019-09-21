admin = Admin.find_or_create_by(first_name: 'admin', last_name: 'admin', email: 'admin@localhost.com')
admin.password = 'admin'
admin.save

60.times do |i|
  u = [Manager, Developer].sample.new
  u.email = "email#{i}@mail.gen"
  u.first_name = "FN#{i}"
  u.last_name = "LN#{i}"
  u.password = i.to_s
  u.save
end

author = Manager.find_or_create_by(email: 'bob.manager@localhost.com', first_name: 'Bob', last_name: 'Manager')
author.password = '123456'
author.save

20.times do |i|
  state = %i[new_task in_development in_qa in_code_review ready_for_release released archived].sample
  Task.create(name: "Task #{i}", description: "Description #{i}", author: author, state: state)
end
