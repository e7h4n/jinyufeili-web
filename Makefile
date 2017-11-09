build:
	foolish-angular
	foolish
	foolish-rev
	foolish-prefix --prefix https://static.jinyufeili.com/

deploy: build
	rsync -avzp dist/ 47.92.54.50:~/online/static
	qshell qupload qiniu_conf.json
