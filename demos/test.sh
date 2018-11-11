#!/bin/bash

. ./loadvariables.sh

A=`aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE | grep '"StackName": "dynamo-customer1'`
echo $A
STACKNAME=`echo "{ $A \"t\":1 }" | jq ".StackName" --raw-output`
echo "Here it is: $STACKNAME"
