class PostFavoriteing < ActiveRecord::Base
  attr_accessible :post_id, :user_id
  
  validates :post_id, :uniqueness => {:scope => :user_id}
  validates :post_id, :user_id, :presence => true
  
  belongs_to :user
  belongs_to :post
end
