export default function FavoriteUnfavoriteButton( {onClickFunction, children}) {
  return (
    <button onClick={onClickFunction} className="top-2 right-2 border-2 bg-red-400 absolute rounded-md">{children}</button>
  )
}
