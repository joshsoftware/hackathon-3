module Api
  module V1
    class UserEventsController < ApplicationController
      include LighthouseService

      def create
        events_data = create_params # Assuming the JSON body contains "clicks" key as shown in the example
        service = EventsService::Create.new(events_data).call
    
        render json: { data: service, message: "Events created successfully" }, status: :created
      end

      def get_metrics
        processed_urls = []
        urls_array = metric_params
        urls_array.each do |url|
          processed_urls << run(url)
        end

        render json: {
          data: processed_urls,
          message: I18n.t('user_events.success.get_metrics')
        }, status: :ok
      end

      private

      def metric_params
        params.permit(urls: [])[:urls]
      end

      def create_params
        params.require(:clicks).map do |click|
          click.permit(
            :uid,
            :element_id,
            :now,
            :action,
            :url,
            :user_agent
          )
        end
      end
    end
  end
end
