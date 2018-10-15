defmodule Discuss.GameController do
  use Discuss.Web, :controller

  alias Discuss.Game

  plug Discuss.Plugs.RequireAuth when action in [:index, :new, :create, :edit, :update, :delete]
  plug :check_game_owner when action in [:update, :edit, :delete]

  def index(conn, _params) do
    games = Repo.all(Game)
    render conn, "index.html", games: games
  end

  def new(conn, _params) do
    changeset = Game.changeset(%Game{}, %{})
    render conn, "new.html", changeset: changeset, token: get_csrf_token()
  end

  def create(conn, %{"game" => game, "player_data" => player_data}) do
    changeset = conn.assigns.user
      |> build_assoc(:games)
      |> Game.changeset(game)

    case Repo.insert(changeset) do
      {:ok, game} ->
        json conn, game
      {:error, errors} ->
        json conn, changeset
    end
  end

  def edit(conn, %{"id" => topic_id}) do
    game = Repo.get(Game, topic_id)
    changeset = Game.changeset(game)

    render conn, "edit.html", changeset: changeset, game: game
  end

  def update(conn, %{"id" => topic_id, "game" => game}) do
    old_topic = Repo.get(Game, topic_id)
    changeset = Game.changeset(old_topic, game)

    case Repo.update(changeset) do
      {:ok, _topic} ->
        conn
        |> put_flash(:info, "Game Updated")
        |> redirect(to: game_path(conn, :index))
      {:error, changeset} ->
        render conn, "edit.html", changeset: changeset, game: old_topic
    end
  end

  def delete(conn, %{"id" => topic_id}) do
    Repo.get!(Game, topic_id) |> Repo.delete!

    conn
    |> put_flash(:info, "Game Deleted")
    |> redirect(to: game_path(conn, :index))
  end

  def check_game_owner(conn, _params) do
    %{params: %{"id" => topic_id}} = conn
    if Repo.get(Game, topic_id).user_id == conn.assigns.user.id do
      conn
    else
      conn
      |> put_flash(:error, "You do not have access to that game")
      |> redirect(to: game_path(conn, :index))
      |> halt()
    end
  end
end
