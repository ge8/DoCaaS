#!/bin/bash

cd migration
npm install aws-sdk
cd ..

cd lambdas/src
npm install
cd ..