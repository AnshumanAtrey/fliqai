'use client';

import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import Header from '../component/header';

export default function GetTokenPage() {
  const [token, setToken] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const idToken = await user.getIdToken();
          setToken(idToken);
        } else {
          setError('No user signed in. Please sign in first.');
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to get token');
      }
    };

    getToken();
  }, []);

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-light-text dark:text-dark-text">
            Get Your Firebase Token
          </h1>

          {error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p className="font-bold">Error</p>
              <p>{error}</p>
              <p className="mt-2">Please <a href="/signin" className="underline">sign in</a> first.</p>
            </div>
          ) : token ? (
            <div className="space-y-4">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <p className="font-bold">✅ Token Retrieved Successfully!</p>
                <p className="text-sm">Token length: {token.length} characters</p>
              </div>

              <div className="bg-light-secondary dark:bg-dark-secondary border border-black p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
                    Your Firebase ID Token
                  </h2>
                  <button
                    onClick={copyToken}
                    className="px-4 py-2 bg-[#FF9269] text-white border border-black hover:bg-[#ff7b4d] transition-colors"
                    style={{ boxShadow: '2px 2px 0 0 #000' }}
                  >
                    {copied ? '✅ Copied!' : '📋 Copy Token'}
                  </button>
                </div>

                <div className="bg-white dark:bg-dark-tertiary p-4 border border-black overflow-x-auto">
                  <code className="text-sm break-all font-mono text-light-text dark:text-dark-text">
                    {token}
                  </code>
                </div>
              </div>

              <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded">
                <p className="font-bold">⚠️ Security Warning</p>
                <p className="text-sm">
                  This token gives full access to your account. Never share it publicly or commit it to git.
                  Tokens expire after 1 hour.
                </p>
              </div>

              <div className="bg-light-secondary dark:bg-dark-secondary border border-black p-6">
                <h3 className="text-lg font-bold mb-4 text-light-text dark:text-dark-text">
                  Test the API
                </h3>
                <p className="mb-4 text-light-text dark:text-dark-text">
                  Use this curl command to test the essay analysis endpoint:
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                  <pre className="text-sm">
{`curl -X POST https://fliq-backend-bxhr.onrender.com/api/essay/analyze \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${token.substring(0, 50)}..." \\
  -d '{
    "essay": "Your essay text here",
    "prompt": "Essay prompt"
  }'`}
                  </pre>
                </div>
              </div>

              <div className="bg-light-secondary dark:bg-dark-secondary border border-black p-6">
                <h3 className="text-lg font-bold mb-4 text-light-text dark:text-dark-text">
                  Using the Test Script
                </h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                  <pre className="text-sm">
{`cd /Users/saurabhyadav/Desktop/fliq-backend
./test-essay-api.sh "${token.substring(0, 50)}..."`}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9269] mx-auto mb-4"></div>
              <p className="text-light-text dark:text-dark-text">Loading token...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
