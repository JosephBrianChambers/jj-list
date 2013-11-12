class Photo < ActiveRecord::Base
  attr_accessible :post_id, :image
  
  has_attached_file :image, :styles => { :medium => "300x218#", :thumb => "50x50#" }
  
  belongs_to :post
  
end
