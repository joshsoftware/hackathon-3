class CreateAggregateEvents < ActiveRecord::Migration[7.2]
  def change
    create_table :aggregate_events do |t|
      t.string :uid
      t.binary :screenshot, :limit => 10.megabyte
      t.references :action, foreign_key: true
      t.references :user_event, foreign_key: true

      t.timestamps
    end
  end
end
