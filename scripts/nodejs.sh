#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Check if NVM is installed
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # Load NVM
  . "$NVM_DIR/nvm.sh"

  # Install node
  nvm install node
  # Your script commands here
  node --version
  npm --version
else
  echo "NVM is not installed. Please install NVM and try again."
fi
#source ~/.bashrc
