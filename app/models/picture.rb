class Picture < ApplicationRecord
    validates :title, :description, presence: true

    validate :ensure_image

    belongs_to :photographer,
        class_name: 'User',
        foreign_key: :photographer_id,
        primary_key: :id

    has_one_attached :image

    def ensure_image
        unless self.image.attached?
            errors[:image] << 'must be attached'
        end
    end
end