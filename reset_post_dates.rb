#this script will reset post 'created_at' attibutes
#to seem as if every 20% of posts were created 
#1,2,3,4,5 days ago respectively. it should be run daily

posts_per_set = (Post.all.length * 0.2).floor
posts_ids = Post.pluck(:id).shuffle

5.times do |posts_set| 
  1.upto(posts_per_set) do |i|
    post_id = posts_ids.shift
    post = Post.find(post_id)
    post.update_attribute("created_at", Time.now - posts_set.to_i.days)
  end
end