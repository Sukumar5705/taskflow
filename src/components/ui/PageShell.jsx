const PageShell = ({ children, maxWidth = 'max-w-[1200px]' }) => (
  <div className="min-h-screen w-full bg-bg px-6 py-6 sm:px-8 sm:py-7">
    <div className={`${maxWidth} mx-auto`}>{children}</div>
  </div>
);

export default PageShell;
