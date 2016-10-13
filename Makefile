build:
	foolish-angular
	foolish
	foolish-rev
	foolish-prefix --prefix https://static.jinyufeili.com/

deploy: build
	rsync -avzp dist/ aws:~/online/static
	qrsync qiniu_conf.json
