class CreateEvents < ActiveRecord::Migration[7.2]
  def change
    create_table :events do |t|
      t.string :uid
      t.string :action
      t.datetime :action_performed_at
      t.string :url
      t.string :element_id

      t.timestamps
    end
  end
end
