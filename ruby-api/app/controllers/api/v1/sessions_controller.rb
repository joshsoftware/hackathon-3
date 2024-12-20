module Api
  module V1
    class SessionsController < ApplicationController
      def login
        user = User.find_by(email: params[:email])

        if user&.authenticate(params[:password])
          token = JwtTokenService.encode({ user_id: user.id })
          render json: { token: token, user: user }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end
    end
  end
end
