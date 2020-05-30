defmodule PenteWeb.PageLive do
  use PenteWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    Process.send_after(self(), :joao, 100)

    socket = socket
      |> assign(:last_draw, %{x: nil, y: nil})
      |> assign(:mimi, 0)

    {:ok, socket}
  end

  @impl true
  def handle_info(:joao, %{assigns: %{mimi: mimi}} = socket) do
    # Process.send_after(self(), :joao, 100)

    {:noreply, assign(socket, :mimi, mimi + 1)}
  end

  @impl true
  def handle_event("cris", event, socket) do
    IO.inspect(event, label: :event)

    {:noreply, socket}
  end

  @impl true
  def handle_event("mousedown", event, socket) do
    IO.inspect(event, label: :event)

    {:noreply, assign(socket, :last_draw, event)}
  end

  @impl true
  def render(%{last_draw: last_draw } = assigns) do
    x = last_draw["x"]
    y = last_draw["y"]

    ~L"""
      <canvas data-mimi="<%= @mimi %>" data-drawX="<%= x %>" data-drawY="<%= y %>" phx-hook="canvas" phx-click="cris" id="marcos" width="1000" height="1000"></canvas>
    """
  end
end
