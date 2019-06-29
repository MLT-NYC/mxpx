class Picture < ApplicationRecord
    validates :title, :description, presence: true

    validate :ensure_image

    belongs_to :photographer,
        class_name: 'User',
        foreign_key: :photographer_id

    has_one_attached :image

    has_many :comments, as: :commentable

    has_many :likes,
        class_name: 'Like',
        foreign_key: :picture_id

    has_many :likers, 
        through: :likes,
        source: :liker

    def ensure_image
        unless self.image.attached?
            errors[:image] << 'Must be attached'
        end
    end

end