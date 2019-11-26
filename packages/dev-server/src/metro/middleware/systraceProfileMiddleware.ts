/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import fs from 'fs';
import http from 'http';

import { RawRequest } from '../index.types';

export default function systraceProfileMiddleware(
  req: RawRequest,
  res: http.ServerResponse,
  next: (err?: any) => void
) {
  if (req.url !== '/systrace') {
    next();
    return;
  }

  console.info('Dumping profile information...');
  const dumpName = `/tmp/dump_${Date.now()}.json`;
  fs.writeFileSync(dumpName, req.rawBody);
  const response =
    `Your profile was saved at:\n${dumpName}\n\n` +
    'On Google Chrome navigate to chrome://tracing and then click on "load" ' +
    'to load and visualise your profile.\n\n' +
    'This message is also printed to your console by the packager so you can copy it :)';
  console.info(response);
  res.end(response);
}