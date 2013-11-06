class Post < ActiveRecord::Base
  attr_accessible :body, :location, :price, :title, :user_id
  
  validates :body, :location, :price, :title, :user_id, :presence => true
  
end
