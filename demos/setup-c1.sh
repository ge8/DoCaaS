#!/bin/bash

. ./loadvariables.sh

# ACM Setup
echo 'Start ACM setup'
./acm.sh
echo 'Finished ACM setup'

# App 1 Setup
echo 'Start App1 setup'
./app1setup.sh
echo 'Finished App1 setup'

# Monolith 1 Setup
echo 'Start monolith1 setup'
./monolith1setup.sh
echo 'Finished monolith1 setup'

# Add Customer 1 R53 record
echo 'Start C1 R53 add'
./c1addr53record.sh
echo 'Finished C1 R53 add'

# Add and populate C1 passwords in DynamoDB
echo 'Start C1 DynamoDB'
./dynamo1setup.sh
echo 'Finished C1 DynamoDB'
