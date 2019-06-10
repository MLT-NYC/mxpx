class Api::PicturesController < ApplicationController

    def show
        @picture = Picture.find(params[:id])
        render 'api/pictures/show'
    end 
    
    def index
        @pictures = current_user.pictures.all
        render :index
    end

    def create
        @picture = current_user.pictures.new(picture_params)
   
        if @picture.valid? && @picture.profile 
            previous_picture = current_user.pictures.where("profile = true")
            previous_picture.each { |pic| pic.destroy }

            @picture.save
            current_user.update_attributes(profile_picture_id: @picture.id)
            render 'api/pictures/show'

        elsif @picture.valid? && @picture.cover 
            new_picture_path = params[:picture][:image].path

            if correct_cover_resolution?(new_picture_path)
                previous_picture = current_user.pictures.where("cover = true")

                previous_picture.each do |pic|
                    if pic.showcase
                        pic.update_attributes(cover: false)
                    else
                        pic.destroy
                    end
                end

                @picture.save
                current_user.update_attributes(cover_picture_id: @picture.id)
                render 'api/pictures/show'
            else
                render json: ['Cover photos must be in landscape orientation and at least 2000x1000 pixels'], status: 400
            end
        elsif @picture.valid?
            @picture.save
            render 'api/pictures/show'
        else
            render json: @picture.errors.full_messages, status: 400
        end

    end

    def update
        @picture = current_user.pictures.find(params[:id])

        if @picture && params[:picture][:profile]
            # This logic may be used later to update an existing photo into a profile pic.
            previous_picture = current_user.pictures.where("profile = true")
            previous_picture.each { |pic| pic.update_attributes(profile: false) }
            @picture.update_attributes(picture_params)
            render 'api/pictures/show' 

        elsif @picture && params[:picture][:cover]
            new_picture_path = url_for(@picture.image)

            if correct_cover_resolution?(new_picture_path)
                previous_picture = current_user.pictures.where("cover = true")

                    previous_picture.each do |pic|
                        if pic.showcase
                            pic.update_attributes(cover: false)
                        else
                            pic.destroy
                        end
                    end

                current_user.update_attributes(cover_picture_id: @picture.id)
                @picture.update_attributes(picture_params)
                render 'api/pictures/show' 
            else
                render json: ['Cover photos must be in landscape orientation and at least 2000x1000 pixels'], status: 400
            end

        elsif @picture
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
        params.require(:picture).permit(:image, :title, :description, :profile, :cover, :showcase)
    end

end