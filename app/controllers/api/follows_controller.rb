class Api::FollowsController < ApplicationController

    def follow
        @follow = Follow.new(follows_params)
        @follow.save
        render 'api/follows/show'
    end

    def unfollow
        @follow = Follow.where(follower_id: follows_params[:follower_id]).where(followee_id: follows_params[:followee_id]).first
        render 'api/follows/show'
        @follow.destroy
    end

    private
    def follows_params
        params.require(:follow).permit(:follower_id, :followee_id)
    end
end