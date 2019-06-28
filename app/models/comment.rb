class Comment < ApplicationRecord 
    belongs_to :commentable, polymorphic: true

    has_many :comments, as: :commentable

    belongs_to :author,
        class_name: 'User',
        foreign_key: :author_id
end