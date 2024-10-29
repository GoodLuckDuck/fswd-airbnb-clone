class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def booking_success
    @booking_id = params[:id]  # Retrieve the booking ID from the URL
    # Optionally, you can fetch booking details from the database using the booking ID
    # @booking = Booking.find(@booking_id) if @booking_id.present?
    render 'booking_success'  # Render the success view
  end
end