class Api::V1::TasksController < Api::V1::ApplicationController
  def index
    q_params = params[:q] || { s: 'id asc' }

    tasks = Task
      .ransack(q_params)
      .result
      .page(params[:page])
      .per(params[:per_page])

    json = {
      items: tasks,
      meta: build_meta(tasks),
      each_serializer: TaskSerializer
    }

    respond_with json
  end

  def show
    task = Task.find(params[:id])
    respond_with task, serializer: TaskSerializer
  end

  def create
    task = current_user.my_tasks.create(task_params)
    respond_with task, serializer: TaskSerializer, location: nil
  end

  def update
    task = Task.find(params[:id])
    task.update(task_params)
    respond_with task, serializer: TaskSerializer, location: nil
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    respond_with :ok, location: nil
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :author_id, :assignee_id, :state_event)
  end
end
