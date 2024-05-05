// 'use client';
import { Box, Flex, Slider, SliderFilledTrack, SliderTrack, Text } from '@chakra-ui/react';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';

import ThemedInput from './ThemedInput/ThemedInput';
import { Img } from 'react-image';

export interface OnProgressProps {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

const format = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const pad = (string: number) => {
  return ('0' + string).slice(-2);
};

export const VideoPlayer = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isRemainingTime, setIsRemainingTime] = useState(false);
  const videPlayerRef = useRef(null);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleClickFullscreen = () => {
    const player: { wrapper: Element } = videPlayerRef.current!;
    if (player) {
      screenfull.request(player.wrapper);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayed(+event.target.value);
  };

  const handleSeekMouseUp = (event: MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    if (videPlayerRef.current) {
      const seeker: { seekTo: (value: number) => void } = videPlayerRef.current;
      seeker.seekTo(+event.currentTarget.value);
    }
  };

  const handleProgress = (state: OnProgressProps) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  return (
    <Flex
      width='100%'
      height='100%'
      flexDirection='column'
      gap='10px'
    >
      {domLoaded && (
        <ReactPlayer
          className='react-player'
          width='100%'
          height='100%'
          playing={playing}
          muted={muted}
          volume={volume}
          url={'https://www.youtube.com/watch?v=oQY1VouspmM'}
          onProgress={handleProgress}
          onDuration={handleDuration}
          ref={videPlayerRef}
        />
      )}
      <Flex
        width='100%'
        gap='20px'
        alignItems='center'
      >
        <Text
          color='white'
          fontSize='12px'
        >
          {format(duration * played)}
        </Text>
        <ThemedInput
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
          value={played}
        />
        <Box
          onClick={() => setIsRemainingTime(!isRemainingTime)}
          cursor='pointer'
        >
          <Text
            color='white'
            fontSize='12px'
          >
            {isRemainingTime ? format(duration) : format(duration * (1 - played))}
          </Text>
        </Box>
      </Flex>
      <Flex justifyContent='space-between'>
        <Flex
          gap='10px'
          width='200px'
          height='30px'
          cursor='pointer'
        >
          <Img
            src={'/static/icons/triangle.svg'}
            alt={'e-mail'}
            width={30}
            height={30}
            onClick={handlePlayPause}
          />
          <Img
            src={'/static/icons/volume.svg'}
            alt={'e-mail'}
            width={30}
            height={30}
            onClick={handleMute}
          />

          <Slider
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
          >
            <SliderTrack
              boxSize={2}
              backgroundColor='black'
              borderRadius='10px'
            >
              <SliderFilledTrack
                backgroundColor='lightGray'
                borderRadius='10px'
              />
            </SliderTrack>
          </Slider>
        </Flex>
        <Flex
          gap='10px'
          cursor='pointer'
        >
          <Img
            src={'/static/icons/heart.svg'}
            alt={'e-mail'}
            width={30}
            height={30}
          />
          <Img
            src={'/static/icons/parameter.svg'}
            alt={'e-mail'}
            width={30}
            height={30}
          />
          <Img
            src={'/static/icons/square.svg'}
            alt={'e-mail'}
            width={30}
            height={30}
            onClick={handleClickFullscreen}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
