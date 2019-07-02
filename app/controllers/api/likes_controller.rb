class Api::LikesController < ApplicationController

    def like
        @like = Like.new(like_params)

        if @like.save
            render 'api/likes/show'
        else
            render json: @like.errors.full_messages, status: 400
        end
    end

    def unlike
        @like = Like.where(picture_id: params[:like][:picture_id]).where(liker_id: params[:like][:liker_id]).first

        if @like
            render 'api/likes/show'
            @like.destroy
        else
            render json: ['You have to like, before you unlike']
        end
    end

    private
    def like_params
        params.require(:like).permit(:liker_id, :picture_id)
    end
    
end