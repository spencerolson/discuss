defmodule Discuss.Repo.Migrations.AddGames do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :player_count, :integer
      add :structure_bonus_tile, :string
      add :date, :naive_datetime
      add :user_id, references(:users)
      add :winner_id, references(:users)
    end
  end
end
