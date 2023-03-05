import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='uppercase'>
      <Link to="/">
        <span className='text-xs'>Restaurant</span><br />
        <span className='font-bold tracking-widest text-lg text-orange-600'>Transparent</span>
      </Link>
    </div>
  )
}

export default Navbar