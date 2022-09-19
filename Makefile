.PHONY: githooks install test clean

githooks:
	ln -sf ../../githooks/pre-commit .git/hooks/pre-commit

install: githooks
	rm -f package-lock.json
	npm install --no-optional

test:
	npm test

clean:
	rm -rf node_modules

generate-fork-pipeline-changes:
	git co main
	node .github/scripts/create-fork-pipeline-changes.js $(PWD) $(owner)
  
