#!/bin/bash
export NODE_ENV=production
npm run clean
npm run postcss
npm run webpack
firebase deploy
