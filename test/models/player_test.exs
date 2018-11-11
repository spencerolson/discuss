defmodule Discuss.PlayerTest do
  use Discuss.ModelCase

  alias Discuss.Player

  @valid_attrs %{coins_in_hand: 42, faction: "some content", name: "some content", pairs_of_resources: 42, player_mat: "some content", popularity: 42, stars: 42, structure_bonus_count: 42, territories: 42, total: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Player.changeset(%Player{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Player.changeset(%Player{}, @invalid_attrs)
    refute changeset.valid?
  end
end
