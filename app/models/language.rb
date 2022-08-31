class Language < ApplicationRecord
  validates :name, presence:true, uniqueness:{case_sensitive:false}
  validates :abbr, presence:true, uniqueness:{case_sensitive:false}
end
