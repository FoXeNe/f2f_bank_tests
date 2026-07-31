#!/usr/bin/bash
set -e

git clone https://github.com/FoXeNe/f2f_bank_tests
cd f2f_bank_tests
docker compose up -d
npm install
npm run test
