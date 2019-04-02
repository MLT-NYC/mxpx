class Picture < ApplicationRecord
    validates :img_url, :title, :description, presence: true

    belongs_to :photographer,
        class_name: 'User',
        foreign_key: :photographer_id,
        primary_key: :id

end