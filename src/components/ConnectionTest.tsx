import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function ConnectionTest() {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [message, setMessage] = useState('Testing connection...');
  const [results, setResults] = useState<string[]>([]);

  const testConnection = async () => {
    setStatus('testing');
    setMessage('Testing connection...');
    setResults([]);

    try {
      // Test 1: Environment Variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        setStatus('error');
        setMessage('❌ Environment variables missing');
        setResults([
          'VITE_SUPABASE_URL: ' + (supabaseUrl ? '✅ Set' : '❌ Missing'),
          'VITE_SUPABASE_ANON_KEY: ' + (supabaseKey ? '✅ Set' : '❌ Missing')
        ]);
        return;
      }

      setResults(prev => [...prev, '✅ Environment variables configured']);

      // Test 2: Basic Database Connection
      const { data, error } = await supabase.from('projects').select('count').limit(1);

      if (error) {
        setStatus('error');
        setMessage('❌ Database connection failed');
        setResults(prev => [...prev, `Database error: ${error.message}`]);
        return;
      }

      setResults(prev => [...prev, '✅ Database connection successful']);

      // Test 3: Authentication
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        setResults(prev => [...prev, '⚠️  No active session (this is OK for testing)']);
      } else {
        setResults(prev => [...prev, '✅ Authentication working']);
      }

      // Test 4: Edge Function
      try {
        const { data: functionData, error: functionError } = await supabase.functions.invoke('chat-with-ai', {
          body: { message: 'test', conversationHistory: [], projectId: null }
        });

        if (functionError) {
          setResults(prev => [...prev, `⚠️  Edge Function error: ${functionError.message}`]);
        } else {
          setResults(prev => [...prev, '✅ Edge Function working']);
        }
      } catch (error) {
        setResults(prev => [...prev, '⚠️  Edge Function not available (may need deployment)']);
      }

      setStatus('success');
      setMessage('✅ Connection test completed');

    } catch (error) {
      setStatus('error');
      setMessage(`❌ Connection failed: ${error.message}`);
      setResults(prev => [...prev, `Unexpected error: ${error.message}`]);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔧 Connection Test
          <span className={`text-sm px-2 py-1 rounded ${
            status === 'success' ? 'bg-green-100 text-green-800' :
            status === 'error' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {status === 'success' ? '✅ Working' :
             status === 'error' ? '❌ Issues Found' :
             '🔄 Testing...'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{message}</p>

        {results.length > 0 && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Test Results:</p>
            {results.map((result, index) => (
              <p key={index} className="text-xs font-mono bg-muted p-2 rounded">
                {result}
              </p>
            ))}
          </div>
        )}

        <Button onClick={testConnection} size="sm" className="w-full">
          🔄 Run Test Again
        </Button>
      </CardContent>
    </Card>
  );
}
