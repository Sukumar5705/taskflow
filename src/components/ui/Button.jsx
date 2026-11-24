const VARIANTS = {
  primary:
    'bg-text text-accent-ink hover:bg-white disabled:opacity-50',
  secondary:
    'bg-raised text-text border border-line2 hover:border-text2/40 disabled:opacity-50',
  ghost:
    'bg-transparent text-text2 border border-line hover:text-text hover:border-line2 disabled:opacity-50',
  danger:
    'bg-negative/10 text-negative border border-negative/25 hover:bg-negative/20 disabled:opacity-50',
};

const SIZES = {
  sm: 'text-xs px-3 py-1.5 rounded-md',
  md: 'text-sm px-4 py-2 rounded-md',
  lg: 'text-sm px-5 py-2.5 rounded-lg',
};

const Button = ({ variant = 'primary', size = 'md', className = '', children, ...props }) => (
  <button
    className={`font-medium transition-colors duration-150 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
