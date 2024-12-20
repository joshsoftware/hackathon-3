module EventsService
  class Create
    def initialize(events_params)
      @events_params = events_params
    end
  
    def call
      @events_params.each do |event_param|
        create_event(event_param)
      end
    end
  
    private
  
    def create_event(event_param)
      Event.create(
        uid: event_param["unique_identifier"],
        action: event_param["action"],
        action_performed_at: Time.at(event_param["now"] / 1000.0),
        url: event_param["url"],
        element_id: event_param["element_identifier"]
      )
    end
  end
end
