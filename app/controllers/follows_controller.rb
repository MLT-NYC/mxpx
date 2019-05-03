class Api::FollowsController < ApplicationController

    def create
        @follow = Follow.new(follows_params)
        @follow.save
    end

    def destroy
        @follow = current_user.followees.find(params[:id])
        @follow.destroy
    end

    private
    def follows_params
        params.require(:follow).permit(:follower_id, :followee_id)
    end
end