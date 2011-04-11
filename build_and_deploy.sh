#!/bin/sh

usage()
{
cat << EOF
usage: $0 [options] server

This script builds and deploys the SproutCore app to the specified server.
Supported servers are: production, staging, dev

OPTIONS:
   -s      Skip building the sproutcore app and just deploy the current build
EOF
}


SKIP_BUILD=false
while getopts “s” OPTION
do
  case $OPTION in
    s)
      SKIP_BUILD=true
      ;;
    ?)
    usage
    exit
    ;;
  esac
done

SERVER_LABEL=${@:$OPTIND}
if [ -x $SERVER_LABEL ]; then
  usage
  exit 1
fi

USER="deploy"
SERVER_ROOT="/web/portal"

case "$SERVER_LABEL" in
  production)
    SERVER=ruby-vm4.concord.org
    ;;
  staging)
    SERVER=ruby-vm3.concord.org
    ;;
  dev)
    SERVER=otto.concord.org
    SERVER_ROOT="/web/assessment.dev.concord.org"
    ;;
  *)
    echo "Invalid server!"
    usage
    exit 1
    ;;
esac

export SERVER_PATH="${SERVER_ROOT}/shared/public/static"
export LABEL_PATH="${SERVER_ROOT}/shared/public/labels"


if $SKIP_BUILD; then
  echo "Skipping build."
else
  echo "Building smartgraphs."
  rm -rf tmp/
  sc-build
fi

BUILD=$(sc-build-number smartgraphs)
echo "Smartgraphs build hash: ${BUILD}"

echo "Syncing with the server: $SERVER"
# If you don't have rsync, use scp instead
# scp -r tmp/build/static/* geniverse@$SERVER:$SERVER_PATH/
rsync -rlzP tmp/build/static/* $USER@$SERVER:$SERVER_PATH/


read -p "What label should this be deployed with? " -e -r LABEL

CMD="rm $LABEL_PATH/${LABEL}; ln -s $SERVER_PATH/smartgraphs/en/${BUILD} $LABEL_PATH/${LABEL}"
# echo "Running command: $CMD"
ssh -t $USER@$SERVER $CMD

CMD="cd $SERVER_ROOT/current/public; for i in \$(ls $LABEL_PATH); do rm \$i; ln -s $LABEL_PATH/\$i \$i; done"
# echo "Running command: $CMD"
ssh -t $USER@$SERVER $CMD
