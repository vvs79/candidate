class Interview < ActiveRecord::Base
  belongs_to :template
  belongs_to :user
  has_many :interview_questions
  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :target_level, presence: true
  validates :template_id, presence: true
end
