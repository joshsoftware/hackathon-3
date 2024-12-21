class AggregateEventsController < ApplicationController
  
  # GET /aggregate_events

  def index
    grouped_events = AggregateEvent.joins(:action, :user_event)
                                   .group(:action_id)
                                   .select(
                                     'aggregate_events.action_id, actions.action, actions.url, actions.element, user_events.user_agent, COUNT(aggregate_events.id) as rage_count'
                                   )
  
    render json: grouped_events
  end
end
