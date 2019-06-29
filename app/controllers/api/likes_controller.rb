class Api::LikesController < ApplicationController
    before_action :ensure_not_own_picture, only: [:create]

    def create
        @like = Like.new(like_params)

        if @like.save
            render 'api/likes/show'
        else
            render json: @like.errors.full_messages, status: 400
        end
    end

    def destroy
        @like = Like.where(picture_id: params[:picture_id]).where(liker_id: params[:liker_id])
        render 'api/likes/show'
        @like.destroy
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