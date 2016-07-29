build-development:
	npm install
	gulp

build-dev:
	npm install
	gulp --cdn http://test-static.zhenguanyu.com/jinyufeili-web/
	RSYNC_PASSWORD=2aHbStbT2LXn rsync -avzp dist/ rsyncer@soho-common-static-nginx1-test.zhenguanyu.com::static/site/jinyufeili-web

build-test:
	npm install
	gulp --cdn http://test-static.zhenguanyu.com/jinyufeili-web/
	RSYNC_PASSWORD=2aHbStbT2LXn rsync -avzp dist/ rsyncer@soho-common-static-nginx1-test.zhenguanyu.com::static/site/jinyufeili-web

build-production:
	npm install
	gulp --cdn http://static.zhenguanyu.com/jinyufeili-web/
	RSYNC_PASSWORD=2aHbStbT2LXn rsync -avzp dist/ rsyncer@dx-common-static-nginx1-online.zhenguanyu.com::static/site/jinyufeili-web
	RSYNC_PASSWORD=2aHbStbT2LXn rsync -avzp dist/ rsyncer@dx-common-static-nginx2-online.zhenguanyu.com::static/site/jinyufeili-web
