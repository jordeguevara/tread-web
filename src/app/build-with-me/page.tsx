"use client";

import { Header } from "../page";

const SupportButton = ({
  amount,
  description,
}: {
  amount: number;
  description: string;
}) => {
  const handleSupport = async () => {
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: description,
        unitAmount: amount * 100,
        currency: "usd",
      }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <button
      className="rounded p-4 bg-blue-600 text-white hover:bg-blue-500"
      onClick={handleSupport}
    >
      {description}
    </button>
  );
};

export default function BuildWithMePage() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">
            Help Me Build Something That Deserves to Exist
          </h1>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Who I Am</h2>
          <p className="mt-4">
            I’m Jorde. I’m a solo founder, engineer, and builder. I’m not backed
            by VCs, I’m not trying to make a quick exit. I’m building something
            because I believe in it.
          </p>
          <p className="mt-4">
            My app helps people track their workouts without the extra steps.
            Just clean, fast, and frictionless tracking for people who actually
            train.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Why I'm Doing This</h2>
          <p className="mt-4">
            I’ve spent the last year bleeding time into this between work, life,
            and everything else. I’m building this because I couldn’t find
            anything that fit my standards. If I can help a few people train
            better, live better, and feel like they’re in control, that’s a win.
          </p>
          <p className="mt-4">
            But I also want this to grow. I want to take it from indie side
            project to full-on platform. If you’ve ever felt like most apps talk
            down to you, like they were built by product managers who’ve never
            lifted anything heavier than a MacBook, this is for you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Roadmap</h2>
          <ul className="mt-4 list-disc pl-6">
            <li>✅ Mobile + Web MVP live</li>
            <li> Mobile app (iOS) (in progress)</li>
            <li> Workout history, charts, and insights (in progress)</li>
            <li> Community features (find accountability)</li>
            <li> Nutrition logging integration(only what matters)</li>
            <li> AI workout auto-fill (smarter, not harder)</li>
            <li> AI-powered exercise suggestions (based on your history)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold">How You Can Help</h2>
          <p className="mt-4">
            You can back the project with a donation, a comment, or a share. It
            all matters. I’m not asking you to pay for nothing, I’m asking you
            to believe this should exist.
          </p>
          <p className="mt-4">
            If you're down to support, hit the button. If not, leave a comment
            and tell me why. Feedback sharpens the blade.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Choose Your Support</h2>
          <div className="mt-4 flex flex-col gap-4">
            <SupportButton
              amount={5}
              description="Buy me post-workout protein ($5)"
            />
            <SupportButton
              amount={15}
              description="Help me pay for servers ($15)"
            />
            <SupportButton
              amount={40}
              description="Support a full month of development ($40)"
            />
            <SupportButton
              amount={0}
              description="Custom – You tell me what it’s worth"
            />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Leave a Comment</h2>
          <p className="mt-4">
            Got thoughts? Cool. I don’t need praise I need real ones. Tell me
            what works, what sucks, what you’d kill to see in a fitness app. I
            read everything. Even the harsh stuff. Especially the harsh stuff.
          </p>
          {/* Replace with your comment system integration */}
          <div className="mt-4">
            <iframe
              src="https://commentbox.io/embed"
              className="w-full h-64 border rounded"
              title="Comments"
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
}
