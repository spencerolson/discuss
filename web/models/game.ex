defmodule Discuss.Game do
  use Discuss.Web, :model

  schema "games" do
    field :player_count, :integer
    field :structure_bonus_tile, :string
    field :date, :naive_datetime
    has_many :players, Discuss.Player
    belongs_to :user, Discuss.User
    belongs_to :winner, Discuss.User
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:player_count, :structure_bonus_tile, :date])
    |> validate_required([:player_count, :structure_bonus_tile, :date])
  end
end