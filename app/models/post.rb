class Post < ActiveRecord::Base
  attr_accessible :body, :location, :price, :title, :user_id
  
  validates :body, :location, :price, :title, :user_id, :presence => true
  
  has_many :photos, :inverse_of => :post, :dependent => :destroy
end
