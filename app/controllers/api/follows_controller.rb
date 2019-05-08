class Api::FollowsController < ApplicationController

    def create
        @follow = Follow.new(follows_params)
        @follow.save
        render 'api/follows/show'
    end

    def destroy
        @follow = Follow.all.find(params[:id])
        render 'api/follows/show'
        @follow.destroy
    end

    private
    def follows_params
        params.require(:follow).permit(:follower_id, :followee_id)
    end
end