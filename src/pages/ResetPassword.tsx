import { useState, useEffect } from 'react';
import { Key, Check, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const ResetPassword = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { updatePassword, session } = useAuth();

  useEffect(() => {
    if (!session) {
      setError('Session expired. Please request a new password reset.');
      setTimeout(() => onNavigate('/forgot-password'), 3000);
    }
  }, [session, onNavigate]);

  const passwordRequirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isPasswordValid) {
      setError('Password does not meet all requirements');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const { error: updateError } = await updatePassword(password);

    if (updateError) {
      setError(updateError);
    } else {
      setSuccess('Password updated successfully! Redirecting to login...');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        onNavigate('/login');
      }, 2000);
    }
    setLoading(false);
  };

  const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <X className="w-4 h-4 text-gray-300" />
      )}
      <span className={met ? 'text-green-700' : 'text-gray-600'}>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
              <Key className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Set New Password</h1>
          <p className="text-center text-gray-600 mb-8">Create a secure password for your account</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
              {password && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                  <p className="text-xs font-semibold text-gray-700">Password must contain:</p>
                  <RequirementItem met={passwordRequirements.length} text="At least 8 characters" />
                  <RequirementItem met={passwordRequirements.uppercase} text="At least one uppercase letter" />
                  <RequirementItem met={passwordRequirements.lowercase} text="At least one lowercase letter" />
                  <RequirementItem met={passwordRequirements.number} text="At least one number" />
                  <RequirementItem met={passwordRequirements.special} text="At least one special character" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
              {confirmPassword && (
                <div className="mt-2">
                  {passwordsMatch ? (
                    <p className="text-sm text-green-600 flex items-center gap-2">
                      <Check className="w-4 h-4" /> Passwords match
                    </p>
                  ) : (
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <X className="w-4 h-4" /> Passwords do not match
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !isPasswordValid || !passwordsMatch}
              className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
