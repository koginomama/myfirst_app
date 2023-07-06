class CreateGarments < ActiveRecord::Migration[6.0]
  def change
    create_table :garments do |t|
      t.string :image_name,       null: false
      t.string :content,          null: false
      t.references  :user,        null: false,foreign_key: true
      t.timestamps
    end
  end
end
