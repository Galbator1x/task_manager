class Web::DevelopersController < Web::ApplicationController
  respond_to :html
  def new
    @developer = Developer.new
  end

  def create
    @developer = Developer.new(developer_params)

    if @developer.save
      sign_in @developer
      redirect_to :board
    else
      respond_with @developer
    end
  end

  private

  def developer_params
    params.require(:developer).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
