import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function isAuth(Component) {
  return function IsAuth(props) {
    const navigate = useNavigate();

    useEffect(() => {
      const signed = localStorage.getItem('email')
      if (!signed) {
        navigate('/')
        return
      }
    }, [navigate])

    return <Component {...props} />
  }
}
