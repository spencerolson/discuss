defmodule Discuss.Repo.Migrations.RemoveOldData do
  use Ecto.Migration

  def up do
    drop table(:topics)
    drop table(:users)
  end
end
