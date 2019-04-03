class Api::PicturesController < ApplicationController

    def show
        @picture = Picture.find(params[:id])
        render 'api/pictures/show'
    end 
    
    def index
        @pictures = Picture.all
        render :index
    end

    def create
        @picture = current_user.pictures.new(picture_params)

        if @picture.save
            render 'api/pictures/show'
        else
            render json: @picture.errors.full_messages, status: 400
        end
    end

    def update
        @picture = current_user.pictures.find(params[:id])
        if @picture
            @picture.update_attributes(picture_params)
            render 'api/pictures/show'
        else
            render json: @picture.errors.full_messages, status: 400
        end
    end

    def destroy
        @picture = current_user.pictures.find(params[:id])
        render 'api/pictures/show'
        @picture.destroy

    end

    private
    def picture_params
        params.require(:picture).permit(:image, :title, :description)
    end

end