module Api
  module V1
    class EventsController < ApplicationController
      def create
        events_data = create_params # Assuming the JSON body contains "clicks" key as shown in the example
        service = EventsService::Create.new(events_data)
    
        if service.call
          render json: { message: "Events created successfully" }, status: :created
        else
          render json: { error: "Failed to create events" }, status: :unprocessable_entity
        end
      end

      private

      def create_params
        params.require(:clicks).map do |click|
          click.permit(
            :uid,
            :element_id,
            :now,
            :action,
            :url
          )
        end
      end
    end
  end
end
