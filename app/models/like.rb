class Like < ApplicationRecord
    belongs_to :picture,
        class_name: 'Picture',
        foreign_key: :picture_id

    belongs_to :liker,
        class_name: 'User',
        foreign_key: :liker_id
end