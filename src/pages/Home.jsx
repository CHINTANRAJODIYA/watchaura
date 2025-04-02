import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const brands = [
    { name: "Rolex", image: "/rolex.png", link: "/product?tab=allproduct&&term=rolex" },
    { name: "Zenith", image: "/zenith.png", link: "/product?tab=allproduct&&term=zenith" },
    { name: "Breitling", image: "/breitling.png", link: "/product?tab=allproduct&&term=breitling" },
    { name: "Seiko", image: "/seiko.png", link: "/product?tab=allproduct&&term=seiko" },
    { name: "Longines", image: "/longines.png", link: "/product?tab=allproduct&&term=longines" },
    { name: "Hublot", image: "/hublot.png", link: "/product?tab=allproduct&&term=hublot" },
    { name: "Titan", image: "/titan.png", link: "/product?tab=allproduct&&term=titan" },
    { name: "Omega", image: "/omega.png", link: "/product?tab=allproduct&&term=omega" },
    { name: "Tag Heuer", image: "/tag.png", link: "/product?tab=allproduct&&term=tagheuer" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <video 
          className="w-full h-full object-cover" 
          autoPlay 
          loop 
          muted
        >
          <source src="/watch2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Luxury Timepieces</h1>
            <p className="text-xl md:text-2xl">Discover the Art of Precision</p>
          </motion.div>
        </div>
      </div>

      {/* Brands Section */}
      <div className="py-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#a16207] to-[#e3bd25] bg-clip-text text-transparent"
        >
          Top Brands
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={brand.link}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-semibold">{brand.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6"
            >
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Authentic Products</h3>
              <p className="text-gray-600">Guaranteed authenticity for all our luxury timepieces</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6"
            >
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Secure and quick delivery worldwide</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6"
            >
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2">Premium Service</h3>
              <p className="text-gray-600">Expert support and after-sales service</p>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
