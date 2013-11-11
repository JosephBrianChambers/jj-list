collection @posts, :object_root => false
attributes :id, :body, :location, :price, :title, :user_id
node(:created_at) do |post|
  "#{post.created_at.day} #{Date::MONTHNAMES[post.created_at.month][0...3]}"
end

node(:imageUrls) do |post| 
  post.photos.map do |photo|
    photo.image.url(:thumb)
  end
end

node(:mediumImageUrls) do |post|
  post.photos.map do |photo|
    photo.image.url(:medium)
  end
end