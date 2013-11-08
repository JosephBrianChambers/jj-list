collection @posts, :object_root => false
attributes :id, :body, :location, :price, :title, :user_id
node(:imageUrls) do |post| 
  post.photos.map do |photo|
    photo.image.url(:thumb)
  end
end