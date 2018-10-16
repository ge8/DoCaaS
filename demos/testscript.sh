#!/bin/bash


BUCKETC1=docaasc1
find r53c1.json -type f -exec sed -i -e "s/##TARGETGOESHERE##/https:\/\/$BUCKETC1.s3-website-us-west-2.amazonaws.com/g" {} \;

