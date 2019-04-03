class Picture < ApplicationRecord
    validates :title, :description, presence: true

    belongs_to :photographer,
        class_name: 'User',
        foreign_key: :photographer_id,
        primary_key: :id

    has_one_attached :image
end