build:
	foolish-angular
	foolish
	foolish-rev
	foolish-prefix --prefix https://static.jinyufeili.com/

deploy: build
	rsync -avzp dist/ bcc:~/online/static
	qrsync qiniu_conf.json
