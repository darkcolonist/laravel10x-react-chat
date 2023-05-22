<!doctype html>
<html>
  <head>
    <script>
      const APP_NAME="{{config("app.name")}}";
      const APP_URL="{{config("app.url")}}";
      const WIDGET_MAX_MESSAGES="{{config("app.widget_max_messages")}}";
      const PAGE_LOAD="{{date("r")}}";
    </script>

    @viteReactRefresh
    @vite('resources/js/bootstrap.jsx')
  </head>
  <body>
    <div id="root">
      javascript must be enabled
    </div>
  </body>
<html>