defmodule Discuss.Repo.Migrations.CreatePlayer do
  use Ecto.Migration

  def change do
    create table(:players) do
      add :coins_in_hand, :integer
      add :faction, :string
      add :name, :string
      add :pairs_of_resources, :integer
      add :player_mat, :string
      add :popularity, :integer
      add :stars, :integer
      add :structure_bonus_count, :integer
      add :territories, :integer
      add :total, :integer
      add :game_id, references(:games)
      add :user_id, references(:users)

      timestamps()
    end

  end
end
