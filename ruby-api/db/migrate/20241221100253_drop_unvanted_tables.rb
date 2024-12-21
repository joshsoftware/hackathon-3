class DropUnvantedTables < ActiveRecord::Migration[7.2]
  def change
    drop_table :events
    execute "DROP TABLE event_aggregations CASCADE;"
  end
end
