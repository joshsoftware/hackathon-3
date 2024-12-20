class CreateEventAggregations < ActiveRecord::Migration[7.2]
  def change
    create_table :event_aggregations do |t|
      t.string :url
      t.string :element_id
      t.string :action
      t.integer :occurrences
      t.integer :duration
      t.integer :event_type

      t.timestamps
    end
  end
end
