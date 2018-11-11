defmodule Discuss.Router do
  use Discuss.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Discuss.Plugs.SetUser
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug Discuss.Plugs.SetUser
  end

  scope "/", Discuss do
    pipe_through :browser # Use the default browser stack

    get "/login", AuthController, :index
    get "/", GameController, :index
    get "/games/new", GameController, :new
    get "/games/:id", GameController, :show
    get "/games/:id/edit", GameController, :edit
    put "/games/:id/update", GameController, :update
    delete "/games/:id/delete", GameController, :delete
    get "/privacy", PrivacyPolicyController, :index
    get "/users/:id/edit", UserController, :edit
    put "/users/:id/update", UserController, :update
  end

  scope "/auth", Discuss do
    pipe_through :browser

    get "/signout", AuthController, :signout
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end

   # Other scopes may use custom stacks.
   scope "/api", Discuss do
     pipe_through :api

     post "/games", GameController, :create
     get "/users", UserController, :index
   end
end
