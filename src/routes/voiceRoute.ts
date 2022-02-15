import express, { Router } from 'express';
import * as dotenv from 'dotenv';
import Grid from 'gridfs-stream';
import { connection, mongo } from 'mongoose';

dotenv.config();

const voiceRouter = Router();
const gfs = Grid(connection.db, mongo);
gfs.collection('');
voiceRouter.get('/:id', async (req, res, next) => {
  const readstream = gfs.createReadStream({ filename: req.params.id });
  readstream.on('error', function (error) {
    res.sendStatus(500);
  });
  res.type('audio/mpeg');
  readstream.pipe(res);
});
