defmodule Discuss.GameView do
  use Discuss.Web, :view

  def render("create.json", %{game: game}) do
    %{
      id: game.id,
      player_count: game.player_count,
      structure_bonus_tile: game.structure_bonus_tile,
      date: game.date,
      user_id: game.user_id,
      winner_id: game.winner_id
    }
  end
end