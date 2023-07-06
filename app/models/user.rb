class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :baby_name, presence: true
  validates :postal_code, presence: true, format: { with: /\A[0-9]{3}-[0-9]{4}\z/, message: 'は(-)ハイフンを含めて入力してください' }
  # validates :gender, presence: true, inclusion: { in: ['おとこのこ', 'おんなのこ'] }

  has_many :garments
end
