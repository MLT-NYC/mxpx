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

        if @picture.valid? && @picture.profile 
            @previous_picture = current_user.pictures.where("profile = true")
            @previous_picture.destroy_all
        elsif @picture.valid? && @picture.cover 
            @previous_picture = current_user.pictures.where("cover = true")
            @previous_picture.destroy_all
        end

        if @picture.save
            current_user.profile_picture_id = @picture.id
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
        params.require(:picture).permit(:image, :title, :description, :profile, :cover)
    end

end