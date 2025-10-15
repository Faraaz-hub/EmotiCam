import jwt from 'jsonwebtoken';
import { redirect } from '@remix-run/node';
import { connectDB } from '~/lib/db.server';
import { User, type IUser } from '~/models/User.server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'parent' | 'admin';
}

export async function createUserSession(user: AuthUser, redirectTo: string = '/dashboard') {
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': `auth-token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}; Path=/`,
    },
  });
}

export async function getUserFromRequest(request: Request): Promise<AuthUser | null> {
  const cookieHeader = request.headers.get('Cookie');
  
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const token = cookies['auth-token'];
  
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: 'parent' | 'admin' };
    
    await connectDB();
    const user = await User.findById(decoded.userId);
    
    if (!user) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    return null;
  }
}

export async function requireUser(request: Request): Promise<AuthUser> {
  const user = await getUserFromRequest(request);
  
  if (!user) {
    throw redirect('/login');
  }
  
  return user;
}

export async function logout() {
  return redirect('/', {
    headers: {
      'Set-Cookie': 'auth-token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/',
    },
  });
}

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
  children?: { name: string; age: number }[];
}): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }

    // Create new user
    const user = new User({
      email: data.email,
      password: data.password,
      name: data.name,
      children: data.children || [],
    });

    await user.save();

    return {
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'Registration failed' };
  }
}

export async function loginUser(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return { success: false, error: 'Invalid email or password' };
    }

    return {
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'Login failed' };
  }
}
