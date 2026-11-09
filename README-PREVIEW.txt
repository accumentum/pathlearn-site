PathLearn.net private preview (static site, no backend, no secrets)
Run on a Mac (Python 3 is built in):
  cd ~/Downloads && unzip -o pathlearn-preview.zip -d pathlearn-preview
  cd pathlearn-preview && python3 -m http.server 48731 --bind 127.0.0.1
Then open http://127.0.0.1:48731/   (Ctrl+C to stop)
Health check: curl -sI http://127.0.0.1:48731/ | head -1   -> HTTP/1.0 200 OK
Opening index.html directly also mostly works, but the server matches GitHub Pages behaviour.
