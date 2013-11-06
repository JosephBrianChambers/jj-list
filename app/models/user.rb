class User < ActiveRecord::Base
  attr_accessible :email, :password
  attr_reader :password
  
  validates :password_digest, :presence => true
  validates :email, :presence => true, :uniqueness => true
  validates :password, :length => {:minimum => 6, :allow_nil => true}
  validates :session_token, :presence => true
  
  before_validation :assign_session_token
  
  has_many :post_favoriteings
  has_many :favorite_posts, :through => :post_favoriteings, :source => :post
  
  has_many(
    :followings,
    :class_name => "Following",
    :foreign_key => :follower_id,
    :primary_key => :id
  )
  has_many :followed_users, :through => :followings, :source => :followed
  
  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    if user && user.is_password?(password)
      user
    else
      nil
    end  
  end
  
  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end
  
  
  private
    def assign_session_token
      self.session_token ||= self.class.generate_session_token
    end
  
end