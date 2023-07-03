class CreateGarments < ActiveRecord::Migration[6.0]
  def change
    create_table :garments do |t|
      t.string       :image_name,  null: false
      t.text         :content,     null: false
      t.timestamps
    end
  end
end
