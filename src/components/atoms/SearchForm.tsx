import { SearchOutlined } from '@ant-design/icons'
import { FocusEvent, FormEvent, memo } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: inline-block;
  position: relative;
`

const Input = styled.input`
  width: 40vw;
  max-width: 20rem;
  padding: 0.5rem 2.5rem 0.5rem 1rem;

  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid transparent;
  border-radius: 8px;
  color: #fff;

  :focus {
    border: 1px solid rgba(255, 255, 255, 0.4);
    outline: none;
  }
`

const SearchButton = styled.button`
  padding: 0;
  background: 0 0;
  border: none;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  :focus {
    outline: none;
  }
`

const SearchIcon = styled(SearchOutlined)`
  padding: 0 0.5rem;
  font-size: 1.5rem;
`

function searchMusicName(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  console.log('searching music name...')
}

function selectAllText(e: FocusEvent<HTMLInputElement>) {
  e.target.select()
}

function SearchForm() {
  return (
    <Form onSubmit={searchMusicName}>
      <Input onFocus={selectAllText} placeholder="음악 검색" spellCheck="false"></Input>
      <SearchButton type="submit">
        <SearchIcon />
      </SearchButton>
    </Form>
  )
}

export default memo(SearchForm)
