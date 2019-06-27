class Api::CommentsController < ApplicationController
    before_action :find_commentable, only: :create

    def show
        @comment = Comment.find(params[:id])
        render 'api/comments/show'
    end

    def index
        @comments = @commentable.comments.all 
        render :index
    end

    def create
        @commentable.new(comment_params)
        
        if @commentable.save
            render 'api/comments/show'
        else
            render json: @commentable.errors.full_messages, status: 400
        end
    end

    private
    def comment_params
        params.require(:comment).permit(:body)
    end

    def find_commentable
        if params[:comment_id]
            @commentable = Comment.find_by(id: params[:comment_id])
        elsif params[:picture_id]
            @commentable = Picture.find_by(id: params[:picture_id])
        end
    end
end