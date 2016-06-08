build:
	gulp

deploy:
	gulp --cdn https://static.jinyufeili.com/
	rsync -avzp dist/ bcc:~/online/static
	qrsync qiniu_conf.json
