export function List({ children }) {
  return <ul className='space-y-2'>{children}</ul>;
}

export function ListItem({ children, className }) {
  return <li className={`p-2 bg-gray-200 rounded-md ${className}`}>{children}</li>;
}
