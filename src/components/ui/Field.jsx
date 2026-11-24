export const inputClass =
  'w-full bg-bg border border-line text-text rounded-md px-3.5 py-2.5 text-sm outline-none ' +
  'transition-colors duration-150 focus:border-accent placeholder:text-muted';

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs text-text2 mb-1.5">{label}</label>
    {children}
  </div>
);

export default Field;
