// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
function LoginForm({}: Props) {
  return (
    <form>
      <label htmlFor="email">이메일</label>
      <input name="email" />
      <label htmlFor="email">비밀번호</label>
      <input />
    </form>
  )
}

export default LoginForm
