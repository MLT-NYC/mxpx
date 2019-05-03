class Follow < ApplicationRecord

    belongs_to :followee,
        class_name: 'User',
        foreign_key: :followee_id,
        primary_key: :id

    belongs_to :follower,
        class_name: 'User',
        foreign_key: :follower_id,
        primary_key: :id


    validate :ensure_not_self

    private
    def ensure_not_self
        if follower_id == followee_id
            errors[:follower_id] << 'You not follow yourself.'
        end
    end
end