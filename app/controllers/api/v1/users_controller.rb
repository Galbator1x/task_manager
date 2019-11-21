class Api::V1::UsersController < Api::V1::ApplicationController
  def index
    q_params = params[:q] || { s: 'id asc' }
    users = User
      .ransack(q_params)
      .result
    json = {
      items: users,
      meta: build_meta_users(users),
      each_serializer: UserSerializer
    }
    respond_with json
  end

  def show
    user = User.find(params[:id])
    respond_with user, serializer: UserSerializer
  end
end
