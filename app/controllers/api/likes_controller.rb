class Api::LikesController < ApplicationController
    before_action :ensure_not_own_picture, only: [:create]

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

    def ensure_not_own_picture
        if current_user.pictures.ids.include?(params[:picture_id])
            render json: ["Sorry, you can't like your own photo"]
        end        
    end
end