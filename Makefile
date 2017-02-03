build:
	ng build -prod --deploy-url=//static.jinyufeili.com/

deploy: build
	rsync -avzp dist/ aws:~/online/static
	qrsync qiniu_conf.json
