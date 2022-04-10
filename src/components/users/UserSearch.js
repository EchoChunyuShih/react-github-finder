import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'
import { searchUsers } from './../../context/github/GithubActions'
const UserSearch = () => {
  const [text, setText] = useState('')
  const { users, dispatch } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (text === '') {
      setAlert('please enter something', 'error')
    } else {
      const users = await searchUsers(text)
      dispatch({ type: 'GET_USERS', payload: users })
    }
  }
  const handleClear = () => {
    setText('')
    dispatch({ type: 'CLEAR_USERS' })
  }
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form className='form-control' onSubmit={handleSubmit}>
          <div className='relative'>
            <input
              type='text'
              className='w-full pr-40 bg-gray-50 input-lg input-bordered input text-black'
              placeholder='Search'
              value={text}
              onChange={handleChange}
            />
            <button
              className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
              type='submit'
            >
              go
            </button>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className='btn btn-ghost btn-lg' onClick={handleClear}>
            clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
