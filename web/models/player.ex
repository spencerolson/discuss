defmodule Discuss.Player do
  use Discuss.Web, :model

  schema "players" do
    field :coins_in_hand, :integer
    field :faction, :string
    field :name, :string
    field :pairs_of_resources, :integer
    field :player_mat, :string
    field :popularity, :integer
    field :stars, :integer
    field :structure_bonus_count, :integer
    field :territories, :integer
    field :total, :integer

    belongs_to :game, Discuss.Game
    belongs_to :user, Discuss.User
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:coins_in_hand, :faction, :name, :pairs_of_resources, :player_mat, :popularity, :stars, :structure_bonus_count, :territories, :total])
    |> validate_required([:coins_in_hand, :faction, :name, :pairs_of_resources, :player_mat, :popularity, :stars, :structure_bonus_count, :territories, :total])
  end
end
