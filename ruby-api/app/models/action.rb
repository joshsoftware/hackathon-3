class Action < ApplicationRecord
  has_many :user_events
  has_many :aggregate_events
end
