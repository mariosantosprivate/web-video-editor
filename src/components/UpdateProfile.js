import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import MyNavbar from './MyNavbar'
import '../styles/UpdateProfile.css'

export default function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        // Perform validation
        if (passwordRef.current.value !==
            passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError('')
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value !== currentUser.password) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <MyNavbar />
            <Container
                className='justify-content-center'
                style={{ minHeight: "100vh", color:"#d8d8d8", paddingTop: '1em' }}
            >
                <div>
                    <Card bg='dark'>
                        <Card.Body>
                            <h2 className='text-center mb-4'>Update Profile</h2>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.email} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' ref={passwordRef} placeholder='Leave blank to keep the same' />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type='password' ref={passwordConfirmRef} placeholder='Leave blank to keep the same' />
                                </Form.Group>
                                <div className="update-button">
                                    <Row className='update-buttons-container'>
                                        <Col className='justify-content-center'>
                                            <Button disabled={loading} type='submit'className='update-button' variant="secondary">
                                                Update
                                            </Button>
                                        </Col>
                                        <Col className='justify-content-center'>
                                            <Link to='/'>
                                                <Button type='submit' className='update-button' variant="danger">
                                                    Cancel
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>


                                    

                                </div>

                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}
