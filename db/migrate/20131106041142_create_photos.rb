class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer :post_id, :null => false

      t.timestamps
    end
  end
end
