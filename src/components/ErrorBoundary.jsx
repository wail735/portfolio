import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary a attrapé une erreur React :", error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#ff4444', backgroundColor: '#111', height: '100vh', fontFamily: 'monospace', overflow: 'auto' }}>
          <h2>🚨 React Crash !</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{this.state.error && this.state.error.toString()}</p>
          <pre style={{ backgroundColor: '#222', padding: '1rem', borderRadius: '8px' }}>
            {this.state.info && this.state.info.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
