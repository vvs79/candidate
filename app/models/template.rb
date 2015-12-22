class Template < ActiveRecord::Base
  has_and_belongs_to_many :questions
  has_one :interview
  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
