class Picture < ApplicationRecord
    validates :title, :description, presence: true

    validate :ensure_image

    belongs_to :photographer,
        class_name: 'User',
        foreign_key: :photographer_id

    has_one_attached :image

    def ensure_image
        unless self.image.attached?
            errors[:image] << 'Must be attached'
        end
    end

end