import { Link } from "react-router-dom"

export default function NavLinkButton({ children, path }) {
  return (
    <Link to={path} className='border-2 rounded-sm p-2 bg-black text-blue-400 border-green-500 hover:bg-gray-700'>{children}</Link>
  )
}
