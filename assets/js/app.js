// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"
import {Socket} from "phoenix"
import NProgress from "nprogress"
import {LiveSocket} from "phoenix_live_view"

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let Hooks = {}

Hooks.canvas = {
  mounted() {
    let canvas = this.el;
    let context = canvas.getContext("2d");

    window.addEventListener("mousedown", (e) => {
      this.pushEvent("mousedown", { x: e.clientX, y: e.clientY })
    })

    Object.assign(this, { canvas, context });
  },
  updated() {
    let { canvas, context } = this;

    let halfHeight = canvas.height / 2;
    let halfWidth = canvas.width / 2;
    let smallerHalf = Math.min(halfHeight, halfWidth);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(128, 0, 255, 1)";
    context.beginPath();
    context.arc(
      this.canvas.dataset.drawx,
      this.canvas.dataset.drawy,
      smallerHalf / 16,
      0,
      2 * Math.PI
      );
      context.fill();
    }
  };

  // Show progress bar on live navigation and form submits
  window.addEventListener("phx:page-loading-start", info => NProgress.start())
  window.addEventListener("phx:page-loading-stop", info => NProgress.done())

  // connect if there are any LiveViews on the page
let liveSocket = new LiveSocket("/live", Socket, {
  hooks: Hooks,
  params: {
    _csrf_token: csrfToken
  },
  metadata: {
    click: (e, el) => {
      return {
        clientX: e.clientX,
        clientY: e.clientY
      }
    }
  }
})
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)
window.liveSocket = liveSocket
