## initialize development environment

```bash
npm install -g gulp
npm install
```

## development

```bash
gulp server
```

It will start a server to combine static files, and a watcher daemon to run jshint check. Use [http://localhost:3000] for development.

## build

```bash
gulp [--cdn CDN_PATH]
```

## deploy

```bash
rsync -avap dist/* USER@SERVER:PATH/
```
