export default function NotFound() {
  return (
    <main className="section-padding">
      <div className="max-content flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
        <p className="font-mono text-sm text-primary">404</p>
        <h1 className="text-3xl font-bold text-text-base">Page not found</h1>
        <p className="text-text-muted">The page you requested does not exist.</p>
        <a href="#top" className="text-sm text-primary hover:text-primary-hover">
          Back to home
        </a>
      </div>
    </main>
  );
}
