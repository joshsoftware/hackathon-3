class DropUnvantedTables < ActiveRecord::Migration[7.2]
  def change
    drop_table :events
    drop_table :event_aggregations
  end
end
