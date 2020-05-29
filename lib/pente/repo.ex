defmodule Pente.Repo do
  use Ecto.Repo,
    otp_app: :pente,
    adapter: Ecto.Adapters.Postgres
end
