#!/bin/sh

if [ -x $1 ]; then
  echo "You must specify which server to install to.\nSupported servers: production, staging, dev\n\nUsage: $0 [server]"
  exit 1
fi

USER="deploy"
SERVER_ROOT="/web/portal"

case "$1" in
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
    exit 1
    ;;
esac

export SERVER_PATH="${SERVER_ROOT}/shared/public/static"
export LABEL_PATH="${SERVER_ROOT}/shared/public/labels"

# rm -rf tmp/
# sc-build

# If you don't have rsync, use scp instead
# scp -r tmp/build/static/* geniverse@$SERVER:$SERVER_PATH/
# rsync -rlzP tmp/build/static/* $USER@$SERVER:$SERVER_PATH/

BUILD=$(sc-build-number smartgraphs)
echo "Smartgraphs build hash: ${BUILD}"

read -p "What label should this be deployed with? " -e -r LABEL

CMD="rm $LABEL_PATH/${LABEL}; ln -s $SERVER_PATH/smartgraphs/en/${BUILD} $LABEL_PATH/${LABEL}"
echo "Running command: $CMD"
ssh -t $USER@$SERVER $CMD

CMD="cd $SERVER_ROOT/current/public; for i in \$(ls $LABEL_PATH); do rm \$i; ln -s $LABEL_PATH/\$i \$i; done"
echo "Running command: $CMD"
ssh -t $USER@$SERVER $CMD
