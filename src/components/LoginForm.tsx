import { FormEvent } from 'react'

function LoginForm() {
  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <form onSubmit={login}>
      <label htmlFor="email">이메일</label>
      <input name="email" />
      <label htmlFor="password">비밀번호</label>
      <input name="password" type="password" />
    </form>
  )
}

export default LoginForm
