import React, { Dispatch, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { registerUser } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { Button, Form } from 'react-bootstrap'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInURL = new URLSearchParams(search).get('redirect')
  const redirect = redirectInURL ? redirectInURL : '/'

  const dispatch: Dispatch<any> = useDispatch()

  const userInfo = useSelector((state: any) => state.user)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      if (password == confirmPassword) {
        await dispatch(registerUser({ name, email, password }))
      } else {
        toast.error('Your password not matched!')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    console.log('ddddddddddddddd', search, 'cc', redirectInURL)
    console.log('user info', userInfo)
    if (userInfo.name) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  return (
    <div className="container-wrapper">
      <div className="small-container">
        <Helmet>
          <title>Log In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
        <Form
          onSubmit={(e) => {
            submitHandler(e)
          }}
        >
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control required onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {userInfo.errMsg ? (
            <h6 className="text-danger">{userInfo.errMsg}</h6>
          ) : (
            ''
          )}

          <div className="mb-3">
            <Button type="submit">Register</Button>
          </div>
          <div className="mb-3">
            Already have an account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign_In</Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default RegisterPage
