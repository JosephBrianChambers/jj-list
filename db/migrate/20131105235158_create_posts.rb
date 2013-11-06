class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id
      t.integer :price
      t.string :title
      t.text :body
      t.string :location

      t.timestamps
    end
  end
end
