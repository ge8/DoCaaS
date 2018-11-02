#!/bin/bash

# Create "plan" attribute
aws cognito-idp add-custom-attributes

# Make "plan" attribute readable to app client.
aws cognito-idp update-user-pool-client

# Add customer 1 to silver plan and customer 2 to bronze plan
aws cognito-idp admin-update-user-attributes
aws cognito-idp admin-update-user-attributes
