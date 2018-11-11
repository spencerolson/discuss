defmodule Discuss.GameController do
  use Discuss.Web, :controller

  alias Discuss.Game
  alias Discuss.User
  alias Discuss.Player

  plug Discuss.Plugs.RequireAuth when action in [:index, :new, :edit, :update, :delete]
  plug :check_game_owner when action in [:update, :edit, :delete]

  def index(conn, _params) do
    games = Repo.all(Game)
    render conn, "index.html", games: games |> Repo.preload([:user, :winner])
  end

  def new(conn, _params) do
    changeset = Game.changeset(%Game{}, %{})
    render conn, "new.html", changeset: changeset, token: get_csrf_token()
  end

  def show(conn, %{"id" => game_id}) do
    game = Repo.get(Game, game_id) |> Repo.preload([:user, :winner, :players])
    render conn, "show.html", game: game
  end

  def create(conn, %{"game" => game, "player_data" => player_data}) do
    [year, month, day] = String.split(game["date"], "-") |> Enum.map(&String.to_integer/1)
    {:ok, date} = NaiveDateTime.new(year, month, day, 0, 0, 0, 0)
    game = Map.put(game, "date", date)
    winner = Repo.get(User, game["winner_id"])
    IO.puts "player_data"
    IO.inspect player_data

    changeset = conn.assigns.user
      |> build_assoc(:games)
      |> Ecto.Changeset.change()
      |> Ecto.Changeset.put_assoc(:winner, winner)
      |> Game.changeset(game)

    case Repo.insert(changeset) do
      {:ok, game} ->
        players = player_data
          |> Enum.map(fn(x) ->  x |> Map.put(:inserted_at, Ecto.DateTime.utc) |> Map.put(:updated_at, Ecto.DateTime.utc) |> Map.put(:game_id, game.id) end)

        Repo.insert_all("players", players)
        render conn, "create.json", game: game
      {:error, errors} ->
        render conn, "create_error.json", errors: errors
    end
  end

  def format_player(player) do
    player |> Map.put(:inserted_at, Ecto.DateTime.utc) |> Map.put(:updated_at, Ecto.DateTime.utc)
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
