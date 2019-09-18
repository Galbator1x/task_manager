class Api::V1::TasksController < Api::V1::ApplicationController
  def index
    q_params = params[:q] || { s: 'id asc' }

    tasks = Task.all
      .ransack(q_params)
      .result
      .page(params[:page])
      .per(params[:per_page])

    json = {
      items: serialize(tasks, TaskSerializer),
      meta: build_meta(tasks)
    }

    respond_with json
  end

  def show
    task = Task.find(params[:id])
    respond_with task
  end

  def create
    task = current_user.my_tasks.new(task_params)

    if task.save
      respond_with task, location: nil
    else
      respond_with json: { errors: task.errors }, status: :unprocessable_entity
    end
  end

  def update
    task = Task.find(params[:id])

    if task.update(task_params)
      respond_with task
    else
      respond_with json: { errors: task.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    task = Task.find(params[:id])
    if task.destroy
      head :ok
    else
      respond_with json: { errors: task.errors }, status: :unprocessable_entity
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :author_id, :assignee_id, :state_event)
  end
end
