defmodule Discuss.UserView do
  use Discuss.Web, :view

  def render("index.json", %{users: users}) do
    Enum.map(users, &user_json/1)
  end

  def user_json(user) do
    %{ name: user.name, email: user.email, id: user.id }
  end
end