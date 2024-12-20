module EventsService
  class Create
    def initialize(events_params)
      @events_params = events_params
    end
  
    def call
      @events_params.each do |event_param|
        Event.create(transformed_params(event_param))
      end
    end

    private

    def transformed_params(event_param)
      event_param.merge(
        "action_performed_at" => Time.at(event_param["now"] / 1000.0)
      ).except("now") # Remove "now" key after transformation
    end
  end
end
