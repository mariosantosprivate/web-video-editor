import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }

    return (
        <>
        <Container 
                    className = 'd-flex align-items-center justify-content-center'
                    style = {{ minHeight: "100vh", color: '#d8d8d8'}}
                >
            <div>
                <Card bg='dark'>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Log In</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit = {handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type = 'email' ref = {emailRef} required/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type = 'password' ref = {passwordRef} required/>
                            </Form.Group>
                            <Button variant='success' disabled = {loading} className = 'w-100' type = 'submit'>
                                Log In
                            </Button>
                        </Form>
                        <div className='w-100 text-center mt-3'>
                            <Link to='/forgot-password'>Forgot Password?</Link>         
                        </div>  
                    </Card.Body>
                </Card>

                <div className='w-100 text-center mt-2'>
                    Need an account? <Link to='/signup'>Sign Up</Link>         
                </div>   
            </div>     
        </Container>
        </>
    )
}
