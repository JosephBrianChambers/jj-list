

require 'faker'
ActiveRecord::Base.transaction do
  (3..35).to_a.each do |i|
    User.create!(:password => "shammy", :username => Faker::Internet.user_name, :email => Faker::Internet.email)
  end
end