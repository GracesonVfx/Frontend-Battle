import React, { useEffect, useRef, useState } from "react";

const SplineWebsite = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [cursorTrails, setCursorTrails] = useState([]);

  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.10.12/build/spline-viewer.js";
    document.head.appendChild(script);

    // Cursor trail effect for about and contact sections
    const handleMouseMove = (e) => {
      const aboutSection = aboutRef.current;
      const contactSection = contactRef.current;

      if (aboutSection || contactSection) {
        const rect =
          aboutSection?.getBoundingClientRect() ||
          contactSection?.getBoundingClientRect();
        const aboutInView =
          aboutSection &&
          e.clientY >= aboutSection.offsetTop &&
          e.clientY <= aboutSection.offsetTop + aboutSection.offsetHeight;
        const contactInView =
          contactSection &&
          e.clientY >= contactSection.offsetTop &&
          e.clientY <= contactSection.offsetTop + contactSection.offsetHeight;

        if (aboutInView || contactInView) {
          const newTrail = {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            opacity: 1,
          };

          setCursorTrails((prev) => [...prev.slice(-20), newTrail]);
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Fade out cursor trails
    const intervalId = setInterval(() => {
      setCursorTrails((prev) =>
        prev
          .map((trail) => ({ ...trail, opacity: trail.opacity - 0.05 }))
          .filter((trail) => trail.opacity > 0)
      );
    }, 50);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      clearInterval(intervalId);
    };
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative">
      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
        <div className="flex space-x-8 items-center">
          <button
            onClick={() => scrollToSection(homeRef)}
            className="text-white hover:text-blue-300 transition-colors duration-300 font-medium"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection(aboutRef)}
            className="text-white hover:text-blue-300 transition-colors duration-300 font-medium"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection(contactRef)}
            className="text-white hover:text-blue-300 transition-colors duration-300 font-medium"
          >
            Contact
          </button>
          <button
            onClick={() => setIsLoginOpen(!isLoginOpen)}
            className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Home Section with Spline Background */}
      <section
        ref={homeRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Spline Viewer Background */}
        <div className="absolute inset-0 w-full h-full">
          <spline-viewer
            url="https://prod.spline.design/tPqxwOn8yyKB9F6I/scene.splinecode"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>

        {/* Gradient Semicircle Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </section>
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1440 150"
          className="w-full h-32"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="blendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#101322" /> {/* End of home */}
              <stop offset="100%" stopColor="#1e1b4b" /> {/* Start of about */}
            </linearGradient>
          </defs>
          <path
            d="M0,0 C480,150 960,0 1440,100 L1440,0 L0,0 Z"
            fill="url(#blendGradient)"
          />
        </svg>
      </div>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-8">About Us</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                We're passionate about creating immersive digital experiences
                that blend cutting-edge technology with stunning visual design.
                Our team specializes in 3D web experiences, interactive
                applications, and modern web development.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                From concept to deployment, we craft digital solutions that
                captivate audiences and deliver exceptional user experiences
                across all platforms.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Our Expertise
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  3D Web Experiences
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Interactive Design
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                  Modern Development
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  User Experience
                </li>
              </ul>
            </div>
          </div>
        </div>
          </section>
            

      {/* Contact Section */}
      <section
        ref={contactRef}
        className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-gray-900 flex items-center justify-center px-8"
      >
        <div className=" max-w-4xl mx-auto text-center mt-32">
          <h2 className="text-5xl font-bold text-white mb-8">Get In Touch</h2>
          <p className="text-xl text-gray-300 mb-12">
            Ready to bring your vision to life? Let's create something amazing
            together.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📧</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <p className="text-gray-300">
                https://gracesonvfx.github.io/My-Portfolio-/
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📱</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Phone</h3>
              <p className="text-gray-300">+91 9821227586</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📍</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Location</h3>
              <p className="text-gray-300">Mumbai, Maharashtra</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
              ></textarea>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cursor Trail Effects */}
      {cursorTrails.map((trail) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none z-30"
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
            opacity: trail.opacity,
            transition: "opacity 0.1s ease-out",
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
        </div>
      ))}

      {/* Login Popup */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-gray-900/95 backdrop-blur-md border-l border-white/20 z-40 transform transition-transform duration-300 ease-in-out ${
          isLoginOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Login</h2>
            <button
              onClick={() => setIsLoginOpen(false)}
              className="text-white hover:text-gray-300 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              Sign In
            </button>

            <div className="text-center">
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                Forgot password?
              </a>
            </div>

            <div className="border-t border-white/20 pt-6">
              <p className="text-center text-gray-400 mb-4">
                Don't have an account?
              </p>
              <button className="w-full bg-transparent border border-white/20 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-all duration-300">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when login is open */}
      {isLoginOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsLoginOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default SplineWebsite;
