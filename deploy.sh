#!/bin/bash
export NODE_ENV=production
npm run clean
npm run webpack
firebase deploy
