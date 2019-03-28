class Api::UsersController < ApplicationController


    def create
        @user = User.new(user_params)

        if @user.save
            log_in(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 400
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :password)
    end
end
