module Api
  module V1
    class AggregateEventsController < ApplicationController
      # GET /aggregate_events
  
      def index
        grouped_events = AggregateEvent.joins(:action, :user_event)
                                      .group('aggregate_events.action_id', 'actions.action', 'actions.url', 'actions.element', 'user_events.user_agent')
                                      .select(
                                        'aggregate_events.action_id, actions.action, actions.url, actions.element, user_events.user_agent, COUNT(aggregate_events.id) as rage_count'
                                      ).order('rage_count DESC')
      
        render json: grouped_events
      end
  
      def update_all
        params[:ids].each do |id|
          AggregateEvent.find(id).update(update_params)
        end
  
        render json: {
          message: "Updated successfully"
        }, status: :ok
      end

      
      def show
        action = Action.find(params[:id])
        user_events = action.aggregate_events.includes(:user_event).map do |ae|
          {
            captured_at: ae.user_event.captured_at,
            user_agent: ae.user_event.user_agent,
            screenshot: ae.screenshot,
          }
        end

        render json: action.as_json.merge(
           user_events: user_events
        ) 
      end
  
      private
  
      def update_params
        params.permit(:screenshot)
      end
    end
  end
end
