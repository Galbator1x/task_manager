class AddInitialStateToTasks < ActiveRecord::Migration[5.2]
  def change
    change_column :tasks, :state, :string, default: :new_task
  end
end
