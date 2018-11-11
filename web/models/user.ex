defmodule Discuss.User do
  use Discuss.Web, :model

  schema "users" do
    field :email, :string
    field :provider, :string
    field :token, :string
    field :name, :string
    has_many :players, Discuss.Player
    has_many :games, Discuss.Game
    has_many :won_games, Discuss.Game, foreign_key: :winner_id

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :provider, :token, :name])
    |> validate_required([:email, :provider, :token])
  end
end