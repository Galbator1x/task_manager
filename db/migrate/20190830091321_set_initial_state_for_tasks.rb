class SetInitialStateForTasks < ActiveRecord::Migration[5.2]
  def change
    Task.update_all(state: :new_task)
  end
end
