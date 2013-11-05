class StaticPagesController < ApplicationController
  before_filter :require_current_user!, :only => [:root]
  
  def root
    render :root
  end

  def welcome
    render :welcome
  end
end
