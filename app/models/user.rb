class User < ApplicationRecord
    validates :password_digest, presence: true
    validates :email, :session_token, presence: true, uniqueness: true
    validates :password, length: {minimum: 6, allow_nil: true}

    attr_reader :password

    after_initialize :ensure_session_token

    has_many :pictures,
        class_name: 'Picture',
        foreign_key: :photographer_id

    has_many :follower_objects,
        class_name: 'Follow',
        foreign_key: :followee_id

    has_many :followee_objects,
        class_name: 'Follow',
        foreign_key: :follower_id

    has_many :followers,
        through: :follower_objects,
        source: :followee

    has_many :followees,
        through: :followee_objects,
        source: :follower

    def password=(password) 
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save!
        self.session_token
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user && user.is_password?(password)
            return user 
        else
            return nil
        end
    end

    def is_password?(password)
        bcrypt_password = BCrypt::Password.new(self.password_digest)
        bcrypt_password.is_password?(password)
    end

    private
    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end
end