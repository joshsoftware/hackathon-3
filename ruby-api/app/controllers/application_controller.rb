class ApplicationController < ActionController::API
  def require_authentication
    token = request.headers['Authorization']&.split(' ')&.last
    decoded_token = JwtTokenService.decode(token)

    if decoded_token
      @current_user = User.find_by(id: decoded_token[:user_id])
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end
