class Admin::UsersController < Admin::ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def index
    @q = User.ransack(params[:q])
    @users = @q.result.order(:type).order(:id).page(params[:page]).per(10)
  end

  def edit
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    respond_with @user, location: admin_users_url
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    respond_with @user, location: admin_users_url
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to admin_users_path
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :type)
  end
end
