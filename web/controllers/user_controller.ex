defmodule Discuss.UserController do
  use Discuss.Web, :controller

  alias Discuss.User

  plug Discuss.Plugs.RequireAuth when action in [:index, :edit]

  def index(conn, _params) do
    users = Repo.all(User)
    render conn, "index.json", users: users
  end

  def edit(conn, %{"id" => user_id}) do
    user = Repo.get(User, user_id)
    changeset = User.changeset(user)
    render conn, "edit.html", changeset: changeset, user: user
  end

  def update(conn, %{"id" => user_id, "user" => user}) do
    old_user = Repo.get(User, user_id)
    changeset = User.changeset(old_user, user)

    case Repo.update(changeset) do
      {:ok, _user} ->
        conn
        |> redirect(to: game_path(conn, :index))
      {:error, changeset} ->
        render conn, "edit.html", changeset: changeset, user: old_user
    end
  end
end
