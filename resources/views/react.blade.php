<!doctype html>
<html>
  <head>
    <script>
      const APP_NAME="{{env("APP_NAME")}}";
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