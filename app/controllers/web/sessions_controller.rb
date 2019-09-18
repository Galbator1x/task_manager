class Web::SessionsController < Web::ApplicationController
  def new
    @session = Session.new
  end

  def create
    @session = Session.new(session_params)

    if @session.valid?
      sign_in @session.user
      redirect_to :board
    else
      respond_with @session
    end
  end

  def destroy
    sign_out
    redirect_to :new_session
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
