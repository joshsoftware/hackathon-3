class CreateActions < ActiveRecord::Migration[7.2]
  def change
    create_table :actions do |t|
      t.string :action
      t.string :url
      t.string :element

      t.timestamps
    end
  end
end
