#!/bin/bash

. ./loadvariables.sh

# App 2 Setup
echo 'Start App2 setup'
./app2setup.sh
echo 'Finished App2 setup'

# Monolith 2 Setup
echo 'Start monolith2 setup'
./monolith2setup.sh
echo 'Finished monolith2 setup'

# Add Customer 2 R53 record
echo 'Start C2 R53 add'
./c2addr53record.sh
echo 'Finished C2 R53 add'

# Add and populate C2 passwords in DynamoDB
echo 'Start C2 DynamoDB'
./dynamo2setup.sh
echo 'Finished C2 DynamoDB'

