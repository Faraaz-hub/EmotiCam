import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, Form, Link } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  return json({ user });
}

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();

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
        {/* Header */}
        <header className="flex justify-between items-center mb-8 animate-slide-down">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-fun font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              Welcome back!
            </h1>
            <span className="text-3xl animate-heart-beat">🌟</span>
          </div>
          
          <Form action="/logout" method="post">
            <button className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 rounded-2xl font-fun font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-white/50 flex items-center gap-2">
              <span className="text-xl animate-wiggle">👋</span>
              Logout
            </button>
          </Form>
        </header>

        {/* User Greeting */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border-4 border-white/30 shadow-2xl mb-8 animate-scale-in">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl animate-bounce-fun">👋</span>
            <h2 className="text-3xl font-fun font-bold text-white">
              Hi {user.name}!
            </h2>
            <span className="text-3xl animate-jiggle">🎉</span>
          </div>
          
          {user.children && user.children.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {user.children.map((child, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <span className="text-xl animate-pulse">👶</span>
                  <span className="font-fun font-bold text-white">
                    {child.name}, {child.age} years old
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Emotion Analysis */}
          <Link to="/" className="group">
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border-4 border-white/30 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-3xl group-hover:border-blue-300 animate-fade-in">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce-fun group-hover:animate-heart-beat">😊</div>
                <h3 className="text-2xl font-fun font-bold text-white mb-2">
                  Emotion Analysis
                </h3>
                <p className="text-white/80 font-semibold">
                  Discover your child's emotions through fun video analysis!
                </p>
              </div>
            </div>
          </Link>

          {/* Video Recommendations */}
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border-4 border-white/30 shadow-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <div className="text-6xl mb-4 animate-jiggle">📺</div>
              <h3 className="text-2xl font-fun font-bold text-white mb-2">
                Video Library
              </h3>
              <p className="text-white/80 font-semibold">
                Personalized video recommendations based on emotions
              </p>
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl font-fun font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                Coming Soon!
              </button>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border-4 border-white/30 shadow-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-6xl mb-4 animate-float">📊</div>
              <h3 className="text-2xl font-fun font-bold text-white mb-2">
                Progress Tracking
              </h3>
              <p className="text-white/80 font-semibold">
                Track emotional development over time
              </p>
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-2xl font-fun font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                Coming Soon!
              </button>
            </div>
          </div>

          {/* Family Settings */}
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border-4 border-white/30 shadow-2xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-6xl mb-4 animate-wiggle">👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-fun font-bold text-white mb-2">
                Family Profile
              </h3>
              <p className="text-white/80 font-semibold">
                Manage children and family settings
              </p>
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-2xl font-fun font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                Coming Soon!
              </button>
            </div>
          </div>

          {/* Learning Resources */}
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border-4 border-white/30 shadow-2xl animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse">📚</div>
              <h3 className="text-2xl font-fun font-bold text-white mb-2">
                Learning Hub
              </h3>
              <p className="text-white/80 font-semibold">
                Educational content about emotions
              </p>
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-2xl font-fun font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                Coming Soon!
              </button>
            </div>
          </div>

          {/* Quick Start */}
          <Link to="/" className="group">
            <div className="bg-gradient-to-r from-green-400/30 to-blue-400/30 backdrop-blur-md rounded-3xl p-6 border-4 border-green-300/50 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-3xl group-hover:border-green-300 animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="text-center">
                <div className="text-6xl mb-4 animate-spin-slow group-hover:animate-jiggle">🚀</div>
                <h3 className="text-2xl font-fun font-bold text-white mb-2">
                  Start Now!
                </h3>
                <p className="text-white/80 font-semibold mb-4">
                  Begin your emotion discovery journey
                </p>
                <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl font-fun font-bold text-white shadow-lg">
                  Let's Go! 🎯
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Fun Stats Section */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border-4 border-white/30 shadow-2xl animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <h3 className="text-2xl font-fun font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
            <span className="text-3xl animate-bounce-fun">🎮</span>
            Your Journey So Far
            <span className="text-3xl animate-heart-beat">🌟</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-2xl p-4 border-2 border-pink-300/50">
              <div className="text-3xl mb-2 animate-pulse">📸</div>
              <div className="text-2xl font-fun font-bold text-white">0</div>
              <div className="text-white/80 font-semibold">Videos Analyzed</div>
            </div>
            
            <div className="text-center bg-gradient-to-r from-blue-400/30 to-indigo-400/30 rounded-2xl p-4 border-2 border-blue-300/50">
              <div className="text-3xl mb-2 animate-jiggle">😊</div>
              <div className="text-2xl font-fun font-bold text-white">0</div>
              <div className="text-white/80 font-semibold">Emotions Detected</div>
            </div>
            
            <div className="text-center bg-gradient-to-r from-green-400/30 to-teal-400/30 rounded-2xl p-4 border-2 border-green-300/50">
              <div className="text-3xl mb-2 animate-float">🎯</div>
              <div className="text-2xl font-fun font-bold text-white">0</div>
              <div className="text-white/80 font-semibold">Insights Gained</div>
            </div>
            
            <div className="text-center bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-2xl p-4 border-2 border-orange-300/50">
              <div className="text-3xl mb-2 animate-wiggle">🏆</div>
              <div className="text-2xl font-fun font-bold text-white">0</div>
              <div className="text-white/80 font-semibold">Days Active</div>
            </div>
          </div>
        </div>

        {/* Motivational Footer */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <div className="flex justify-center gap-4 mb-4">
            <span className="text-4xl animate-bounce-fun">🌈</span>
            <span className="text-4xl animate-wiggle">🎪</span>
            <span className="text-4xl animate-heart-beat">💝</span>
            <span className="text-4xl animate-float">🎨</span>
          </div>
          <p className="text-xl font-fun font-bold text-white bg-gradient-to-r from-purple-600/50 to-pink-600/50 px-8 py-3 rounded-full shadow-lg backdrop-blur-sm border-2 border-white/30 inline-block">
            Every emotion tells a beautiful story! 📖✨
          </p>
        </div>
      </div>
    </div>
  );
}
