## initialize development environment

```bash
npm install -g foolish foolish-angular foolish-rev foolish-prefix
npm install
```

## development

```bash
foolish server
```

It will start a server to combine static files, and a watcher daemon to run jshint check. Use [http://localhost:3000] for development.

## build

```bash
foolish-angular
foolish
foolish-rev
foolish-prefix --prefix https://static.jinyufeili.com/
```

## deploy

```bash
qrsync qiniu_conf.json
```
