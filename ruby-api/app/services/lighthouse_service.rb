require "uri"
require "json"
module LighthouseService
  def run(url)
    encoded_url = URI.encode_www_form_component(url)
    
    # Run Lighthouse in headless mode and capture JSON output
    lighthouse_output = `lighthouse #{url} --output json --quiet --chrome-flags="--headless"`

    # Parse the JSON output
    begin
      report = JSON.parse(lighthouse_output)
    rescue JSON::ParserError => e
      p e.message
      # Rails.logger.error("Failed to parse Lighthouse output: #{e.message}")
      return nil
    end

    # Extract relevant metrics
    {
      url: url,
      performance: report.dig("categories", "performance", "score"),
      accessibility: report.dig("categories", "accessibility", "score"),
      best_practices: report.dig("categories", "best-practices", "score"),
      seo: report.dig("categories", "seo", "score")
    }
  end
end
