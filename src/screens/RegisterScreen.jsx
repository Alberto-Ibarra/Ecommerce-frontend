import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Button, Form, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {register} from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRegister = useSelector(state => state.userRegister)
    console.log(userRegister);
    const {loading, error, userInfo} = userRegister

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
            console.log(message);
        }else{
            dispatch(register(name,email,password))
            navigate('/')
        }
    }


    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>register</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an account?? <Link to={navigate ? `/login?redirect=${navigate}` : '/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen