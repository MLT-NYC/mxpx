class Api::CommentsController < ApplicationController
    before_action :find_commentable, only: [:create, :index, :destroy]

    def show
        @comment = Comment.find(params[:id])
        render 'api/comments/show'
    end

    def index
        @comments = @commentable.comments.all.reverse
        render :index
    end

    def create
        @comment = @commentable.comments.new(comment_params)
        if @comment.save
            render 'api/comments/show'
        else
            render json: @comment.errors.full_messages, status: 400
        end
    end

    def destroy
        @comment = @commentable.comments.find(params[:id])
        render 'api/comments/show'
        @comment.destroy
    end

    private
    def comment_params
        params.require(:comment).permit(:body, :author_id, :commentable_id, :commentable_type)
    end

    def find_commentable
        if params[:comment_id]
            @commentable = Comment.find_by(id: params[:comment_id])
        elsif params[:picture_id]
            @commentable = Picture.find_by(id: params[:picture_id])
        end
    end
end