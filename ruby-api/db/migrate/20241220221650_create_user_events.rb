class CreateUserEvents < ActiveRecord::Migration[7.2]
  def change
    create_table :user_events do |t|
      t.datetime :captured_at
      t.text :user_agent
      t.string :uid
      t.references :action, foreign_key: true

      t.timestamps
    end
  end
end
