export function Button({ children, variant, ...props }) {
  const styles = variant === 'destructive' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600';
  return (
    <button className={`px-4 py-2 text-white rounded-md ${styles}`} {...props}>
      {children}
    </button>
  );
}
