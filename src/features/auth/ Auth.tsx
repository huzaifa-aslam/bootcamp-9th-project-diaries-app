import React, { FC, useState } from 'react'

export const Auth: FC = () => {
    const [isLogIn, setIsLogIn] = useState(true)
    return (
        <div>
            <form>
                <div>

                    <label>Enter Name</label><br />
                    <input type="name" name="username" placeholder="Enter Name..." /><br />
                </div>
                <div>

                    <label>Enter Password</label><br />
                    <input type="number" name="Password" /><br />
                </div>
                {!isLogIn && (

                    <div>

                        <label>Enter Email</label><br />
                        <input type="name" name="email" placeholder="Enter Email..." /><br />
                    </div>
                )}
                <button type="submit">{isLogIn ? 'Login' : 'Create an Account'}</button>
                <p style={{ cursor: 'pointer', opacity: 0.7 }} onClick={() => setIsLogIn(!isLogIn)}>
                    {isLogIn ? 'No account? Create one' : 'Already have an account?'}
                </p>
            </form>
        </div>
    )
}
