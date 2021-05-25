import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'
import MyNavbar from './MyNavbar'
import '../styles/MyVideos.css'
import { storage } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player'

export default function MyVideos() {

    const { currentUser } = useAuth();
    const history = useHistory();
    const storageRef = storage.ref()
    const [videoUrls, setVideoUrls] = useState([]);

    useEffect(() => {
        const loadVideos = () => {
            const videosRef = storageRef.child(`user/${currentUser.uid}`);
            videosRef.listAll().then(res => {
                res.items.forEach(resItem => {
                    resItem.getDownloadURL().then(url => {
                        setVideoUrls(oldArray => [...oldArray, url]) // This line has changed!
                    })
                })
            })
        }
        loadVideos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function navigateTo(navurl) {
        console.log(navurl);
        history.push({
            pathname: '/',
            state: { detail: navurl }
        })
        console.log(navurl);
    }

    return (
        <>
            <MyNavbar />
            <Container fluid className='main-container justify-content-center text-center mt-2'>

                <Row>
                    <Col xs={{ span: 10, offset: 1 }}>
                        <Row className='justify-content-center'>

                            {videoUrls.map((itemRef, index) => (
                                <Col xs={{ span: 4 }} key={index} className='video-col'>
                                    <Card bg='dark' className='file-video-card'>
                                        <Card.Body>
                                            <div key={index}>
                                                <ReactPlayer
                                                    key={index}
                                                    onClick={() => navigateTo(itemRef)}
                                                    className='video-play'
                                                    url={itemRef}
                                                    playing={true}
                                                    volume={0}
                                                    width='100%'
                                                    height='100%'
                                                    loop={true}
                                                    onMouseEnter={(event) => {
                                                        event.target.playing = true;
                                                        console.log(`MouseEnter - playing = ${event.target}`)
                                                    }}
                                                    onMouseLeave={(event) => {
                                                        event.target.playing = false;
                                                        console.log(`MouseLeave - playing = ${event.target}`)
                                                    }} />
                                            </div>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}

                        </Row>
                    </Col>
                </Row>


            </Container>
        </>
    )
}