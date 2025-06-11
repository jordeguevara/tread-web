"use client";

import PricingCard from "@/components/pricingCard";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
// import { ArrowDown, Smartphone, Download } from "lucide-react";
import { useRouter } from "next/navigation";
const APP_NAME = "Tread";
const COMPANY_NAME = "Viracocha Software";

export const Header = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Image
              width={48}
              height={48}
              src="/tread-white-s.svg"
              alt="Tread Logo"
              className="w-full h-full"
            />
          </div>
          <span className="text-xl font-bold text-gray-900">{APP_NAME}</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#download"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Download
          </a>
        </nav>
        <button
          onClick={() => {
            router.push("/workouts");
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700"
        >
          Get Early Access
        </button>
      </div>
    </header>
  );
};

const Home = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleEarlyAccess = () => {
    console.log("Early access signup:", email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <span className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200 rounded-full text-sm font-medium">
          🚀 Coming Soon: AI-Powered Workout Tracking
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Transform Your
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {" "}
            Fitness Journey
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          The most intelligent workout tracking app with AI-powered suggestions,
          real-time competitions with friends, and advanced analytics to help
          you reach your fitness goals faster.
        </p>

        {/* App Store Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          {/* <button className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl flex items-center justify-center text-lg font-medium"> */}
          {/* <Download className="mr-2 h-5 w-5" />
            Download for iOS
          </button> */}
          {/* <button className="border-2 px-8 py-4 rounded-xl flex items-center justify-center text-lg font-medium">
            <Smartphone className="mr-2 h-5 w-5" />
            Download for Android
          </button> */}
        </div>

        {/* Early Access Pricing */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-bold mb-2">
            Lock in Early Bird Pricing Today!
          </h3>
          <p className="text-blue-100 mb-4">
            Get lifetime access to premium features for just $29/year (Regular
            price: $89/year)
          </p>
          <div className="flex max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-l-xl text-gray-900 focus:outline-none"
            />
            <button
              onClick={handleEarlyAccess}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-r-xl font-semibold border-l border-gray-300"
            >
              Lock in Price
            </button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        {/* <div className="relative">
          <div className="w-full max-w-4xl mx-auto h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl shadow-2xl flex items-center justify-center">
            <div className="text-center">
              <Smartphone className="h-24 w-24 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">App Screenshot Preview</p>
            </div>
          </div>
          <ArrowDown className="h-8 w-8 text-gray-400 mx-auto mt-8 animate-bounce" />
        </div> */}
      </section>
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features Coming Soon
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of fitness tracking with AI-powered insights
              and social features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Tracking
              </h3>
              <p className="text-gray-600 mb-4">
                Smart workout detection and form analysis using advanced machine
                learning
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Automatic exercise recognition</li>
                <li>• Real-time form correction</li>
                <li>• Personalized workout suggestions</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Live Competitions
              </h3>
              <p className="text-gray-600 mb-4">
                Challenge friends and compete in real-time workout battles
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Real-time friend challenges</li>
                <li>• Leaderboards and achievements</li>
                <li>• Team workout competitions</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Advanced Analytics
              </h3>
              <p className="text-gray-600 mb-4">
                Deep insights into your fitness progress with AI-powered
                analytics
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Progress trend analysis</li>
                <li>• Strength and endurance metrics</li>
                <li>• Recovery recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Current App Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple. Powerful. Available Now.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start tracking your workouts today with our current app while we
              build the AI features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Track Every Rep, Every Set
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Easy workout logging</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Exercise library with instructions
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Progress tracking and charts
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">+</span>
                  </div>
                  <span className="text-gray-700">Basic workout templates</span>
                </div>
              </div>
            </div>
            {/* <div className="bg-white p-8 rounded-3xl shadow-2xl">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-64 rounded-2xl flex items-center justify-center">
                <Image
                  src="/preview.svg"
                  alt="App current app preview"
                  height={64}
                  width={64}
                  objectFit="cover"
                />
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lock in Your Price Today
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get early access to all future AI features at today's pricing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard
              title="Current App"
              description="Available now"
              price="Free"
              features={[
                { label: "Basic workout tracking" },
                { label: "Exercise library" },
                { label: "Progress charts" },
              ]}
              buttonText="Download Now"
              onClick={() => router.push("/workouts")}
            />

            <PricingCard
              title="AI Premium"
              description="Coming Q4 2025"
              price="$29/year"
              features={[
                { label: "Everything in Current App" },
                { label: "AI-powered form analysis", color: "text-blue-500" },
                { label: "Real-time competitions", color: "text-blue-500" },
                { label: "Advanced analytics", color: "text-blue-500" },
                { label: "Unlimited cloud storage", color: "text-purple-500" },
              ]}
              isHighlight
              highlightText="Early Bird"
              buttonText="Lock in Early Bird Price"
              onClick={() => {
                router.push("/support");
              }}
            />
          </div>
        </div>
      </section>

      <section
        id="download"
        className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Start Your Fitness Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Download our app now and be ready when the AI features launch
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {/* <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl"
            >
              <Download className="mr-2 h-5 w-5" />
              Download for iOS
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl"
            >
              <Smartphone className="mr-2 h-5 w-5" />
              Download for Android
            </Button> */}
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2"> - - </div>
              <p className="text-blue-100">Beta Users</p>
            </div>
            <div>
              {/* ★ */}
              <div className="text-3xl font-bold mb-2">- - </div>
              <p className="text-blue-100">App Store Rating</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">- -</div>
              <p className="text-blue-100">Workouts Tracked</p>
            </div>
          </div>
        </div>
      </section>

      <Footer COMPANY_NAME={COMPANY_NAME} APP_NAME={APP_NAME} />
    </div>
  );
};

export default Home;
