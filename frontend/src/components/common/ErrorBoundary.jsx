import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Unhandled UI error:", error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.assign("/dashboard");
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-light dark:bg-surface-dark px-4 text-center">
          <h1 className="font-display text-2xl font-bold text-ink-light dark:text-ink-dark">
            Something broke on our end
          </h1>
          <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
            The page hit an unexpected error. Try returning to your dashboard.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-600"
          >
            Back to dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
