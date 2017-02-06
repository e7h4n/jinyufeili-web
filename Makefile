build:
	ng build -prod --deploy-url=//static.jinyufeili.com/

serve:
	ng serve --port 3000 --host m.jinyufeili.com --ssl --proxy-config proxy.conf.json

deploy: build
	rsync -avzp dist/ aws:~/online/static
	qrsync qiniu_conf.json
