#!/bin/sh
export PATH="$HOME/.local/node/bin:$PATH"
cd /Users/toshinobuyano/CRM/jimoto-de-hatarako || exit 1
exec node node_modules/next/dist/bin/next dev -p 3800
