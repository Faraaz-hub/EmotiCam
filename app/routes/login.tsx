import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { loginUser, createUserSession, getUserFromRequest } from "~/lib/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Login - KidsEmotion" },
    { name: "description", content: "Login to access KidsEmotion features" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserFromRequest(request);
  if (user) {
    return redirect('/dashboard');
  }
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return json({ error: "Email and password are required" }, { status: 400 });
  }

  const result = await loginUser(email, password);

  if (!result.success) {
    return json({ error: result.error }, { status: 400 });
  }

  return createUserSession(result.user!);
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300 rounded-full animate-bounce-fun opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-300 rounded-full animate-bubble opacity-60"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-blue-300 rounded-full animate-jiggle opacity-60"></div>
        
        {/* Animated Stars */}
        <div className="absolute top-20 left-1/3 text-yellow-400 text-2xl animate-spin-slow">⭐</div>
        <div className="absolute bottom-40 left-20 text-pink-400 text-xl animate-wiggle">🌟</div>
        <div className="absolute top-40 right-1/4 text-blue-400 text-3xl animate-pulse">✨</div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-down">
            <h1 className="text-5xl font-fun font-bold mb-4 animate-float">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                Welcome Back!
              </span>
            </h1>
            <div className="flex justify-center items-center gap-4">
              <span className="text-4xl animate-wiggle">👋</span>
              <p className="text-2xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full shadow-lg">
                Login to KidsEmotion
              </p>
              <span className="text-4xl animate-heart-beat">💖</span>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border-4 border-white/30 shadow-2xl w-full max-w-md animate-scale-in">
            <Form method="post" className="space-y-6">
              <div className="space-y-4">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="text-white font-fun font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl animate-pulse">📧</span>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-2xl border-4 border-white/50 focus:border-blue-400 focus:outline-none bg-white/90 text-gray-800 font-semibold text-lg transition-all duration-300 hover:bg-white focus:bg-white"
                    placeholder="parent@example.com"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="text-white font-fun font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl animate-wiggle">🔒</span>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 rounded-2xl border-4 border-white/50 focus:border-blue-400 focus:outline-none bg-white/90 text-gray-800 font-semibold text-lg transition-all duration-300 hover:bg-white focus:bg-white"
                    placeholder="Your secure password"
                  />
                </div>
              </div>

              {/* Error Message */}
              {actionData?.error && (
                <div className="bg-gradient-to-r from-red-400/30 to-pink-400/30 border-4 border-red-300 rounded-2xl p-4 animate-fade-in">
                  <div className="flex items-center gap-3 text-red-100">
                    <span className="text-2xl animate-jiggle">⚠️</span>
                    <span className="font-fun font-bold">{actionData.error}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 rounded-2xl font-fun font-bold text-xl text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl border-4 border-white/50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                    <span className="text-2xl animate-pulse">⏳</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl animate-bounce-fun">🚀</span>
                    Login to Fun!
                    <span className="text-2xl animate-heart-beat">💖</span>
                  </>
                )}
              </button>
            </Form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-white font-semibold text-lg mb-4 flex items-center justify-center gap-2">
                <span className="text-2xl animate-wiggle">🤔</span>
                Don't have an account?
              </p>
              <Link
                to="/signup"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl font-fun font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 shadow-lg border-4 border-white/50 flex items-center justify-center gap-3 max-w-xs mx-auto"
              >
                <span className="text-2xl animate-jiggle">✨</span>
                Sign Up Here!
                <span className="text-2xl animate-float">🎉</span>
              </Link>
            </div>
          </div>

          {/* Fun Elements */}
          <div className="flex justify-center gap-4 mt-8 animate-fade-in">
            <span className="text-4xl animate-bounce-fun">🎪</span>
            <span className="text-4xl animate-wiggle">🎭</span>
            <span className="text-4xl animate-heart-beat">🌈</span>
            <span className="text-4xl animate-float">🎨</span>
          </div>
        </div>
      </div>
    </div>
  );
}
