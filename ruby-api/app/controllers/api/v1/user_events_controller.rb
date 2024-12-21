module Api
  module V1
    class UserEventsController < ApplicationController
      def create
        events_data = create_params # Assuming the JSON body contains "clicks" key as shown in the example
        service = EventsService::Create.new(events_data).call
    
        render json: { data: service, message: "Events created successfully" }, status: :created
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
