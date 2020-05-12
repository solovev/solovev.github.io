#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
rm -rf ../binom_mdb_dist/
cp -Ri ./dist/ ../binom_mdb_dist/

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# git init
git add -A
git commit -m 'deploy binom_mdb_dist'

# # if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:solovev/solovev.github.io.git master
git push
# # if you are deploying to https://<USERNAME>.github.io/<REPO>
# # git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# cd -