class Api::PicturesController < ApplicationController

    def show
        @picture = Picture.find(params[:id])
    end 
    
    def index
        @pictures = Picture.all
    end

    def create
        @picture = current_user.pictures.new(picture_params)

        if @picture.save
            #make this JBuilder in views
            render 'api/pictures/show'
        else
            render json: @picture.errors.full_messages, status: 400
        end
    end

    def update
        @picture = current_user.pictures.find(params[:id])
        if @picture
            @picture.update_attributes(picture_params)
            #make this JBuilder in views
            render 'api/pictures/show'
        else
            render json: @picture.errors.full_messages, status: 400
        end
    end

    def destroy
        picture = current_user.pictures.find(params[:id])
        picture.destroy
        
        render json: {id: picture.id}
    end

    private
    def picture_params
        params.require(:picture).permit(:img_url, :title, :description)
    end

end