import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import WaveSurfer from "wavesurfer.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

import '../styles/Waveform.css';
const formWaveSurferOptions = ref => ({
    container: ref,
    waveColor: "violet",
    progressColor: "purple",
    cursorColor: "purple",
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 150,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true
});

export default function Waveform({ blob }) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);

    // create new WaveSurfer instance
    // On component mount and when blob changes
    useEffect(() => {
        setPlay(false);

        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);

        wavesurfer.current.loadBlob(blob);

        wavesurfer.current.on("ready", function () {
            if (wavesurfer.current) {
                wavesurfer.current.setVolume(0.5);
                setVolume(0.5);
            }
        });

        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        return () => wavesurfer.current.destroy();
    }, [blob]);

    const handlePlayPause = () => {
        setPlay(!playing);
        wavesurfer.current.playPause();
    };

    const onVolumeChange = e => {
        const { target } = e;
        const newVolume = +target.value;

        if (newVolume) {
            setVolume(newVolume);
            wavesurfer.current.setVolume(newVolume || 1);
        }
    };

    return (
        <Container fluid className='justify-content-center'>
            <Row>
                <Col className='audio-controls' xs={{ span: 2 }}>

                    <Row className='justify-content-center'>
                        <Button className='audio-play-pause' variant='outline-light' onClick={handlePlayPause}>{!playing ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}</Button>
                    </Row>
                    <Row>
                        <input
                            type="range"
                            id="volume"
                            name="volume"
                            // waveSurfer recognize value of `0` same as `1`
                            //  so we need to set some zero-ish value for silence
                            min="0.01"
                            max="1"
                            step=".025"
                            onChange={onVolumeChange}
                            value={volume}
                        />
                    </Row>
                </Col>
                <Col xs={{ span: 10 }}>
                    <div id="waveform" ref={waveformRef} />
                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
        </Container>

    );
}
