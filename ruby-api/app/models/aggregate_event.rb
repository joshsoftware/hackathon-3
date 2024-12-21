class AggregateEvent < ApplicationRecord
  belongs_to :user_event
  belongs_to :action

end
