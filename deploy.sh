#!/usr/bin/env bash
npm run clean
NODE_ENV=production npm run webpack
npm run firebase
npm run pages
