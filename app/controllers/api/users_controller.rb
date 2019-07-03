class Api::UsersController < ApplicationController

    def index
        @users = User.find(params[:users])
        
        render :index
    end

    def create
        @user = User.new(user_params)

        if @user.save
            log_in(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 400
        end
    end

    def update
        @user = User.find(params[:id])

        if @user
            @user.update_attributes(user_params)
            render :show
        else
            render json: @user.errors.full_messages, status: 400
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name, :about, :city, :country, :profile_picture_id, :cover_picture_id)
    end
end
