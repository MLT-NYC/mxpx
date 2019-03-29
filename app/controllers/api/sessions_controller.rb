class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        if @user
            log_in(@user)
            render 'api/users/show'
        else
            render json: ['Invalid Email/Password'], status: 400
        end
    end

    def destroy
        log_out
        render json: {id: current_user.id}
    end

end
