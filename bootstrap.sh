#!/usr/bin/env bash

# inspired from https://github.com/hschne/reveal.js-starter/
set -e

main() {
  local name;
  if [[ ! -z $1 ]]; then
    name=$1
  else
    printf "Please specify a name for your presentation: "
    read -e -r name;
    echo ""
  fi
  [[ -z name ]] && die "The presentation name must not be empty"

  msg "Cloning Reveal.js Starter..."
  git clone --recurse-submodules "https://github.com/iamashwin99/reveal-js-starter-template.git" "$name" &> /dev/null
  cd "$name" && \
    rm -rf .git && \
    rm README.md bootstrap.sh

  msg "Installing dependencies..."
  npm install &> /dev/null

  msg "Building dist"
  npm run build

  echo ""
  success "Presentation sucessfully set up in '$name'! 🚀"
  cat <<-EOF

To open it in your browser run:
  cd '$name'
  npm run serve

EOF

success "Happy presenting!"
}

msg() {
  printf "$1\n"
}

success() {
  local green="\e[32m"
  local clear="\e[0m"
  printf "${green}$1${clear}\n"
}

err() {
  local red="\e[38;5;9m"
  local clear="\e[0m"
  printf "${red}$1\n${clear}\n'"
}

die() {
  local message=$1
  err "$message" && exit 1
}

main "$@"
