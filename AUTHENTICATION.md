# Authentication System Documentation

## Overview

This project implements a comprehensive, secure authentication system using Supabase Auth with email/password authentication. The system includes signup, login, password reset, and session management features.

## Architecture

### Authentication Flow

```
User
  ├── Not Authenticated
  │   ├── Login Page (/login)
  │   ├── Signup Page (/signup)
  │   ├── Forgot Password (/forgot-password)
  │   └── Reset Password (/reset-password)
  └── Authenticated
      ├── Dashboard (/dashboard)
      ├── Cities (/cities)
      ├── Agencies (/agencies)
      └── Zones (/zones)
```

### Key Components

#### 1. AuthContext (`src/contexts/AuthContext.tsx`)
Central authentication state management using React Context API.

**Provides:**
- `user`: Current authenticated user object
- `session`: Active session information
- `isAuthenticated`: Boolean flag for authentication status
- `isLoading`: Loading state during initialization
- `signup()`: User registration
- `login()`: User login
- `logout()`: User logout
- `resetPassword()`: Initiate password reset
- `updatePassword()`: Update password after reset

**Usage:**
```typescript
import { useAuth } from '@/contexts/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, login } = useAuth();
  // Use authentication data and methods
};
```

#### 2. ProtectedRoute (`src/components/ProtectedRoute.tsx`)
Wrapper component that enforces authentication on protected pages.

**Features:**
- Redirects unauthenticated users to login
- Shows loading state during auth initialization
- Prevents access to protected routes without valid session

#### 3. Authentication Pages

##### Login (`src/pages/Login.tsx`)
- Email and password validation
- Error handling and user feedback
- Links to signup and password reset flows
- Disabled state during login process

##### Signup (`src/pages/Signup.tsx`)
- Email validation
- Real-time password strength indicator
- Password requirements enforcement:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- Password confirmation matching
- Email verification notification

##### Forgot Password (`src/pages/ForgotPassword.tsx`)
- Email verification
- Password reset email sending
- User feedback on sent email

##### Reset Password (`src/pages/ResetPassword.tsx`)
- Session verification
- Password strength validation
- Password confirmation matching
- Successful reset notification

## Security Features

### Password Security

1. **Minimum Requirements:**
   - 8+ characters
   - Mixed case (uppercase and lowercase)
   - Numeric digits
   - Special characters (!@#$%^&*)

2. **Hashing & Storage:**
   - Supabase handles bcrypt hashing server-side
   - Passwords never sent in plain text after initial submission
   - Passwords never logged or exposed in client code

3. **Password Reset:**
   - Time-limited reset tokens (configurable in Supabase)
   - Reset link sent via email
   - Session validation required for password update
   - Automatic redirect on session expiration

### Input Validation

1. **Email Validation:**
   - RFC 5322 compatible regex pattern
   - Client-side validation before submission
   - Server-side validation via Supabase

2. **Password Validation:**
   - Client-side strength checking
   - Real-time requirement indicator
   - Server-side enforcement via Supabase

3. **Sanitization:**
   - No custom SQL queries (using ORM/API)
   - Parameterized queries via Supabase
   - XSS prevention through React's DOM escaping

### Session Management

1. **Session Storage:**
   - Managed by Supabase Auth
   - JWT tokens stored securely
   - Automatic session refresh

2. **Session Timeout:**
   - Configurable via Supabase settings
   - Automatic logout on session expiration
   - User notified of session state changes

3. **Multi-Tab Sync:**
   - Auth state synchronized across browser tabs
   - Changes propagated in real-time

### Protection Against Common Vulnerabilities

#### SQL Injection
- **Prevention:** Using Supabase client library (parameterized queries)
- **No raw SQL** in authentication flows
- **API-only approach** eliminates SQL exposure

#### XSS (Cross-Site Scripting)
- **Prevention:** React's built-in XSS protection
- **Input sanitization** via framework
- **No dangerouslySetInnerHTML** used
- **Content Security Policy** can be added to HTML headers

#### CSRF (Cross-Site Request Forgery)
- **Prevention:** Supabase Auth handles CSRF tokens
- **Same-origin requests** only
- **SameSite cookie** enforcement

#### Brute Force Attacks
- **Rate Limiting:** Configure via Supabase Auth settings
- **Account Lockout:** Optional feature available
- **Monitoring:** Log failed attempts for security audit

#### Password Reset Attacks
- **Email Verification:** Only account owner receives reset link
- **Token Expiration:** Reset tokens expire after 24 hours (configurable)
- **One-Time Use:** Tokens can only be used once
- **Session Required:** Prevents unauthorized password changes

## Environment Setup

### Required Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

These are automatically provided by Supabase and should be set in your `.env` file.

### Supabase Configuration

1. **Email Authentication:**
   - Enabled by default
   - Confirmation email optional (disabled in this setup)
   - Can be customized in Supabase dashboard

2. **Auth Providers:**
   - Currently: Email/Password only
   - Can add: Google, GitHub, Microsoft, etc.

3. **Security Settings:**
   - JWT Secret: Configured in Supabase
   - Token Expiration: Default 1 hour
   - Refresh Token: Default 7 days

## Usage Examples

### Sign Up a New User

```typescript
import { useAuth } from '@/contexts/AuthContext';

const SignupExample = () => {
  const { signup } = useAuth();

  const handleSignup = async () => {
    const { user, error } = await signup('user@example.com', 'SecurePass123!');
    if (error) {
      console.error('Signup failed:', error);
    } else {
      console.log('User created:', user?.id);
    }
  };

  return <button onClick={handleSignup}>Sign Up</button>;
};
```

### Log In User

```typescript
import { useAuth } from '@/contexts/AuthContext';

const LoginExample = () => {
  const { login } = useAuth();

  const handleLogin = async () => {
    const { user, error } = await login('user@example.com', 'SecurePass123!');
    if (error) {
      console.error('Login failed:', error);
    } else {
      console.log('User logged in:', user?.id);
    }
  };

  return <button onClick={handleLogin}>Log In</button>;
};
```

### Access Current User

```typescript
import { useAuth } from '@/contexts/AuthContext';

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>Logged in as: {user?.email}</p>
      ) : (
        <p>Not authenticated</p>
      )}
    </div>
  );
};
```

### Protect Routes

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

const App = () => {
  return (
    <ProtectedRoute onNavigateToLogin={handleLoginRedirect}>
      <Dashboard />
    </ProtectedRoute>
  );
};
```

## Password Reset Flow

1. **User requests reset:**
   - Visits `/forgot-password` page
   - Enters email address
   - System sends reset email

2. **Email sent:**
   - Supabase generates time-limited token
   - Email contains reset link with token
   - Link redirects to `/reset-password`

3. **User sets new password:**
   - Enters new password (meeting requirements)
   - Confirms password
   - Session validated server-side
   - Password updated securely

4. **User logs in with new password:**
   - Can immediately login with new credentials
   - Old sessions invalidated (configurable)

## Troubleshooting

### Common Issues

#### "User already registered"
- Email is already associated with an account
- Use "Forgot Password" to reset if needed
- Contact support if account not accessible

#### "Invalid credentials"
- Email or password incorrect
- Check email spelling
- Use "Forgot Password" if unsure
- Passwords are case-sensitive

#### "Session expired"
- User has been inactive for too long
- Will see redirect to login page
- Login again to continue
- Adjust session timeout in Supabase settings if needed

#### "Email not sent"
- Check email address is valid
- Verify Supabase email settings configured
- Check spam folder
- Wait a few moments for delivery

### Debugging Tips

1. **Check Console:**
   - Browser console shows auth errors
   - Supabase auth logs available in dashboard

2. **Auth State:**
   - Use React DevTools to inspect AuthContext
   - Verify `isAuthenticated` and `user` values

3. **Network Requests:**
   - Use browser DevTools Network tab
   - Verify requests to Supabase API
   - Check response status codes

## Best Practices

### For Users
- Use strong, unique passwords
- Don't share login credentials
- Log out on shared computers
- Review account activity regularly
- Enable 2FA if available

### For Developers
- Never commit `.env` files
- Always use HTTPS in production
- Validate inputs server-side
- Log auth events for security audit
- Monitor failed login attempts
- Keep Supabase client library updated
- Regular security reviews
- Test auth flows thoroughly

## Future Enhancements

Potential features to add:

1. **Multi-Factor Authentication (MFA)**
   - TOTP support
   - SMS verification
   - Email verification

2. **Social Authentication**
   - Google OAuth
   - GitHub OAuth
   - Microsoft OAuth

3. **Advanced Features**
   - Session management dashboard
   - Device tracking
   - IP whitelisting
   - Custom security rules

4. **Audit & Monitoring**
   - Login attempt tracking
   - Geographic anomaly detection
   - Security event notifications
   - Comprehensive audit logs

## Support & Documentation

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [React Context API](https://react.dev/reference/react/useContext)
- [Security Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

## License

This authentication system is part of the Hopenn Drive application and is subject to the project's license terms.
