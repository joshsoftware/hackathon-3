module RageClickService
  class Result
    attr_reader :rage_clicks

    def initialize(rage_clicks, total_clicks = 0)
      @rage_clicks = rage_clicks || []
      @total_clicks = total_clicks || 0
    end

    def generate_report
      {
        total_rage_clicks: rage_clicks.length,
        affected_users: rage_clicks.map { |rc| rc[:uid] }.uniq.length,
        problematic_elements: problematic_elements_summary,
        high_confidence_incidents: high_confidence_incidents,
        average_confidence_score: average_confidence_score,
        total_clicks: @total_clicks
      }
    end

    private

    def problematic_elements_summary
      rage_clicks
        .group_by { |rc| rc[:element_id] }
        .transform_values { |clicks| clicks.length }
        .sort_by { |_, count| -count }
        .to_h
    end

    def high_confidence_incidents
      rage_clicks
        .select { |rc| rc[:confidence_score] > 0.8 }
        .map { |rc| rc.slice(:uid, :element_id, :confidence_score) }
    end

    def average_confidence_score
      return 0.0 if rage_clicks.empty?
      rage_clicks.sum { |rc| rc[:confidence_score] } / rage_clicks.length
    end

    def no_of_occurances
    end
  end
end