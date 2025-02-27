export function Card({ children, className }) {
  return <div className={`p-4 bg-white shadow-md rounded-xl ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className='p-2'>{children}</div>;
}
