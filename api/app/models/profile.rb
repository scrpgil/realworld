# frozen_string_literal: true

class Profile < ApplicationRecord
  after_initialize :set_default_values
  belongs_to :user, validate: true
  validates_presence_of :user
  validates_uniqueness_of :user_id

  private

  def set_default_values
    self.bio        ||= ''
  end
end
