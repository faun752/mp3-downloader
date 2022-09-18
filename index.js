const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const url = '';

let stream = ytdl(url, {
    quality: 'highestaudio',
});

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

let start = Date.now();
ffmpeg(stream)
    .audioBitrate(128)
    .save(`./download/music.mp3`)
    .on('progress', p => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${p.targetSize}kb downloaded`);
    })
    .on('end', () => {
        console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
    });