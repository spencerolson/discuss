defmodule Discuss.Game do
  use Discuss.Web, :model

  schema "games" do
    field :player_count, :integer
    field :structure_bonus_tile, :string
    belongs_to :user, Discuss.User
    belongs_to :winner, Discuss.User
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:player_count, :structure_bonus_tile])
    |> validate_required([:player_count, :structure_bonus_tile])
  end
end