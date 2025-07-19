#!/bin/bash

# Clean the dist folder
rimraf dist

# Bundle the project using tsup
tsup

# Clean up unnecessary files
rimraf dist/*.d.cts
 