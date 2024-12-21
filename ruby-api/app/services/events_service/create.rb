module EventsService
  class Create
    def initialize(events_params)
      @events_params = events_params
    end
  
    def call
      ActiveRecord::Base.transaction do
        rage_event_ids = []
        @events_params.each do |event_param|
          action = find_action(event_param)
          user_event_params = build_user_event_params(event_param, action)
          user_event = UserEvent.create!(user_event_params)
          
          if action.user_events.where(uid: event_param[:uid], captured_at: 5.seconds.ago..DateTime.current).count == 5
            rage_click_event = create_aggregate_event(user_event, action)
            rage_event_ids << rage_click_event.id
          end
        end
        rage_event_ids
      end
    rescue ActiveRecord::RecordInvalid => e
      # Handle transaction failure if necessary (e.g., log or raise an error)
      raise e
    end

    private

    def find_action(param)
      Action.find_or_create_by(url: param[:url], element: param[:element_id], action: param[:action])
    end

    def build_user_event_params(event_param, action)
      event_param.except(:url, :element_id, :action, :now).merge(
        action_id: action.id,
        captured_at: Time.at(event_param[:now] / 1000.0)
      )
    end

    def create_aggregate_event(user_event, action)
      AggregateEvent.find_or_create_by!(
        user_event_id: user_event.id,
        action_id: action.id,
        uid: user_event.uid
      )
    end
  end
end
