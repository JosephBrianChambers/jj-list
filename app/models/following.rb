class Following < ActiveRecord::Base
  attr_accessible :followed_id, :follower_id
  
  validates :followed_id, :follower_id, :presence => true
  
  belongs_to(
    :follower,
    :class_name => "User",
    :foreign_key => :follower_id,
    :primary_key => :id
  )
  
  belongs_to(
    :followed,
    :class_name => "User",
    :foreign_key => :followed_id,
    :primary_key => :id
  ) 
end
