#!/bin/bash


aws cognito-idp list-user-pools --max-results 60


# Create "plan" attribute
aws cognito-idp add-custom-attributes

# Make "plan" attribute readable to app client.
aws cognito-idp update-user-pool-client

# Add customer 1 to silver plan
aws cognito-idp admin-update-user-attributes

# Create user 2 with bronze plan

