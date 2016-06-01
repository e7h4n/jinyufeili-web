build:
	gulp

deploy:
	gulp --cdn http://static.jinyufeili.com/
	rsync -avzp dist/ bcc:~/online/static
	qrsync qiniu_conf.json
