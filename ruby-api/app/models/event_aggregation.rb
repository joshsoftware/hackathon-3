class EventAggregation < ApplicationRecord
  enum event_type: [:rage_click, :dead_click, :normal_click]
end
