module Api
  module V1
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
  
      def update_all
        params[:ids].each do |id|
          AggregateEvent.find(id).update(update_params)
        end
  
        render json: {
          message: "Updated successfully"
        }, status: :ok
      end
  
      private
  
      def update_params
        params.permit(:screenshot)
      end
    end
  end
end
