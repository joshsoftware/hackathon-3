module RageClickService
  class Detector
  class InvalidDataError < StandardError; end

  attr_reader :time_window, :min_clicks

  def initialize(time_window: 30, min_clicks: 3)
    @time_window = time_window
    @min_clicks = min_clicks
  end

  def analyze_clicks(user_events)
    validate_data!(user_events)
    
    # Group data by user and element_id
    grouped_data = grouped_by_user_action(user_events)
    
    # Analyze each group for rage clicks
    results = []
    grouped_data.each do |key, interactions|
      action_id = key
      next if action_id.nil?
      
      begin
        if rage_click?(interactions)
          results << {
            action_id: action_id,
            uid: interactions.first["uid".to_sym],
            confidence_score: calculate_confidence_score(interactions),
            total_clicks: interactions.length,
            avg_time_between_clicks: average_time_between_clicks(interactions)
          }
        end
      rescue StandardError => e
        puts "Warning: Error processing interactions for user #{uid}, element #{element_id}: #{e.message}"
        next
      end
    end
    
    RageClickService::Result.new(results)
  end

  private

  def validate_data!(data)
    raise InvalidDataError, "Data cannot be nil" if data.nil?
    raise InvalidDataError, "Data must be an array" unless data.is_a?(Array)
    
    data.each_with_index do |row, index|
      unless row.is_a?(Hash)
        raise InvalidDataError, "Each data row must be a hash (error at index #{index})"
      end
      
      validate_row!(row, index)
    end
  end

  def validate_row!(row, index)
    required_fields = ['uid', 'captured_at', 'action_id']
    
    required_fields.each do |field|
      if row[field.to_sym].nil?
        raise InvalidDataError, "Missing required field '#{field}' at index #{index}"
      end
    end
    
    # Validate timestamp format
    begin
      DateTime.parse(row['captured_at'.to_sym].to_s)
    rescue ArgumentError
      raise InvalidDataError, "Invalid timestamp format at index #{index}"
    end
  end

  def grouped_by_user_action(data)
    data.group_by { |row| [row['action_id'.to_sym]] }
  end

  def parse_timestamp(timestamp_str)
    return nil if timestamp_str.nil?
    DateTime.parse(timestamp_str.to_s)
  rescue ArgumentError
    nil
  end

  def rage_click?(interactions)
    return false if interactions.length < min_clicks

    # Sort interactions by timestamp
    sorted_interactions = interactions
      .map { |i| [i, parse_timestamp(i['captured_at'.to_sym])] }
      .reject { |_, timestamp| timestamp.nil? }
      .sort_by { |_, timestamp| timestamp }
      .map(&:first)
    
    return false if sorted_interactions.length < min_clicks
    
    # Check for rapid successive clicks within time window
    sorted_interactions.each_cons(min_clicks) do |window|
      first_time = parse_timestamp(window.first['captured_at'.to_sym])
      last_time = parse_timestamp(window.last['captured_at'.to_sym])
      
      next if first_time.nil? || last_time.nil?
      
      time_diff = ((last_time - first_time) * 24 * 60 * 60).to_i # Convert to seconds
      return true if time_diff <= time_window
    end
    
    false
  end

  def calculate_confidence_score(interactions)
    # Sort interactions by timestamp
    sorted_interactions = interactions
      .map { |i| [i, parse_timestamp(i['captured_at'.to_sym])] }
      .reject { |_, timestamp| timestamp.nil? }
      .sort_by { |_, timestamp| timestamp }
      .map(&:first)
    
    return 0.0 if sorted_interactions.length < min_clicks
    
    # Factors that increase confidence score
    factors = {
      click_frequency: calculate_click_frequency_score(sorted_interactions),
      click_consistency: calculate_click_consistency_score(sorted_interactions),
      total_clicks: calculate_total_clicks_score(sorted_interactions)
    }
    
    # Weight and combine factors
    weighted_score = (
      factors[:click_frequency] * 0.5 +
      factors[:click_consistency] * 0.3 +
      factors[:total_clicks] * 0.2
    )
    
    weighted_score.clamp(0.0, 1.0)
  end

  def calculate_click_frequency_score(interactions)
    return 0.0 if interactions.length < 2
    
    times = interactions.map { |i| parse_timestamp(i['captured_at'.to_sym]) }.compact
    return 0.0 if times.length < 2
    
    intervals = times.each_cons(2).map { |t1, t2| ((t2 - t1) * 24 * 60 * 60).to_i }
    return 0.0 if intervals.empty?
    
    avg_interval = intervals.sum.to_f / intervals.length
    
    # Score based on average interval (lower interval = higher score)
    score = 1.0 - (avg_interval / time_window)
    score.clamp(0.0, 1.0)
  end

  def calculate_click_consistency_score(interactions)
    return 0.0 if interactions.length < 3
    
    times = interactions.map { |i| parse_timestamp(i['captured_at'.to_sym]) }.compact
    return 0.0 if times.length < 3
    
    intervals = times.each_cons(2).map { |t1, t2| ((t2 - t1) * 24 * 60 * 60).to_i }
    return 0.0 if intervals.empty?
    
    # Calculate variance of intervals
    mean = intervals.sum.to_f / intervals.length
    variance = intervals.map { |i| (i - mean) ** 2 }.sum / intervals.length
    
    # Lower variance indicates more consistent clicking
    score = 1.0 - [variance / (time_window ** 2), 1.0].min
    score.clamp(0.0, 1.0)
  end

  def calculate_total_clicks_score(interactions)
    # More clicks = higher score, up to a reasonable limit
    max_expected_clicks = 10
    score = interactions.length.to_f / max_expected_clicks
    score.clamp(0.0, 1.0)
  end

  def average_time_between_clicks(interactions)
    return 0.0 if interactions.length < 2
    
    times = interactions.map { |i| parse_timestamp(i['captured_at'.to_sym]) }.compact
    return 0.0 if times.length < 2
    
    intervals = times.each_cons(2).map { |t1, t2| ((t2 - t1) * 24 * 60 * 60).to_i }
    return 0.0 if intervals.empty?
    
    intervals.sum.to_f / intervals.length
  end
  end
end
